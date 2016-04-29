 
var plan = require('flightplan');
 
// configuration 
plan.target('production', {
  host: 'Ip Address',
  username: 'user name',
  agent: process.env.SSH_AUTH_SOCK,
  privateKey: '.pem file'
});
 

 
var tmpDir = 'contactsApp-' + new Date().getTime();
 
// run commands on localhost 
plan.local(function(local) {
  local.log('Run build');
  //local.exec('grunt build');
 
  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts 
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});
 
// run commands on the target's remote hosts 
plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: 'ubuntu'});
  remote.rm('-rf /tmp/' + tmpDir);
 
  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: 'ubuntu'});
 
  remote.log('Reload application');
  //remote.sudo('ln -snf ~/' + tmpDir + ' ~/example-com', {user: 'www'});
  //remote.sudo('pm2 reload example-com', {user: 'www'});
});