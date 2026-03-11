module.exports = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  console.log('⌨️ KEYSTROKE:', body.toString());
  res.end('OK');
};