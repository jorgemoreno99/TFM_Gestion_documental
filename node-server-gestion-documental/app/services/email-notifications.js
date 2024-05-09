const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

//Treatment of html template... 
var readHTMLFile = function(path, callback) {
    console.log(path);
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

let emailNotification = async(emailOptions, data) =>{
    try{
        var transporter = await nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: 'fran@idneo.com',
                serviceClient: '100673806203696653028',
                privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3tQVvqNPXwg+S\naE+QmHKTT1B7nRayT7fkxkd9VWYf9GJ6XDtAfyILWmfNZTBvtttVcOwoF91+VcV6\nggqc/jLdZ9fyD05Hg8yAvdH8ZkQWrSFMuT+DN+pUfZNa9Zxt/ogWWKEGWk6WGylw\nEKRi7lRUFF4F0hFqKszJtQpeGr7vcVDKM8CTxIlMyNj6f92H6UcBapUmFxoEMg7Q\nJF4dT67la5M8BqRwjR0pORLDQPFlIck7p4Z4UinK5Bort/4phnmYjPANhNrSLqHA\nYquUKuRG8IijPZkwaGDBTzt56yksQLPf0FJPEDejjELaWbyEioZdghCYRjKOvrX/\nmeTtUjGvAgMBAAECggEATWudOGMSsF2pGV8blQkiVEG7XfUkoQ4mpmQHseLhMLta\nG04ubG6HxvgZQf8QrCwIgJgf9n+kSX9VQ911IpegkR2X7PwVVd9OOr2EtxXUQShC\nneZ+RUs11ti7Vrym6dY4vQ4qApbhgrI8wu1Ikib15B9XRqWy0Cbsel9xWJp1+Et2\nG17PfvEUySnTXPUp0MRLzJih799rbrIGtJJk5pwaD8UcTKI4e/yEHcASzCX5vO+k\n9DItpXbUsMp8Jpu6uGxTydC17CfsOWrhVDXutyA7gmgsBCCg4nBwONWIXNTHu/eu\nhzfx2qznn0Dbq5zE8LQzjc6RPRO1ek77tlS7s9mD+QKBgQDtz+Z0LCs0CpRPVixY\n6GKF53wel7eCPYS8m98WKTl5uv5gYvVeOAgB8gK53dtpc7FeC/b3KfWwLrzAxFXA\nWlERC4DImWl4SQ1PpIlGQ6xxafuNTcc/7V+488raehRBrbaz0eKa5ybbHnNDwg/+\nKkjTKmKowAgbldoBfOY/KZ55BwKBgQDFwc3+FxNO+zpusLDKz9f7HtSojoS2Lm2J\n53pDCUxkPkPNr5Ig1UYsvGO1WIbSLriSosZR3c9ruWLLmXIbSnqQ0Wjc/AfquBzg\n8etXQyp2dBextqiLOFpnqPtRsqSQkt3JIzqDM+zOgG5Um/Ydfhfbse/9mE6HCDOA\n9YnI3CygGQKBgFwvtHkiShkhZL6gfA52/wJDauT9ESEGsfbfQYp4rpQWvdclZVKB\ny/DdHNtqOkzVkVMQtkq31ErYw0jCky8+k6BU4jZg6fa78tIFyUUYpLdOSzpKhUut\nu+aZcvBgVIvlSCbK3NoJcxGL60i/6K0xPQvGqXoa/smavGjJPwQLIShvAoGBALBL\n81E2zx7VNyVg3Wsg2YHk3V6bF1K2ly6ers8+Zdzj6Vxfzdz5ZQMSu6z6i86qmh8X\nf8eR/40giyPI2wHbZuLd3SdMg95LXmtnIA/+L8fD/S+QEDd0+Jt6+Pm/UZgVZiUf\nA9Xdn5oEwtco5sMqGyjfO30Pn8oflJK90qS/LAVZAoGBAJ8xGjt0hscFIyUDuHQn\nzCcUbCe1YGuiDfhh4HAnGYlO8TC0Ufx6k14nxOmIAkbx6Ra2TJVAq9EmqG4hYKY4\nVGAZRCIo7pI2C+eH/9jI6wj1rjx0a65DBJtxgEG9gNjdaFQlt30aQzbMV5r8fzVG\nYynElHUf9tQ3hsByJGuA52JS\n-----END PRIVATE KEY-----\n'
            }
        });

        transporter.verify(function(error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });

        //Treatment of html template... 
        // console.log(__dirname);
        // let dirName = __dirname;
        // let templatePath = dirname + '/src/app/templates/' + emailOptions.template;
        readHTMLFile('app/' + emailOptions.template, function(err, html) {
            var template = handlebars.compile(html);
            var htmlToSend = template(data);

            const mailOptions = {
                from: 'noreply <noreplay@idneo.com>',
                replyTo: 'noreply@idneo.com',
                to: emailOptions.to,
                subject: emailOptions.subject,
                //html: {path : 'app/templates/notificationemail.html'}
                html: htmlToSend
            
            };

            transporter.sendMail(mailOptions, function (err, info){
                if (err){
                    console.log(err);
                    return err;
                }else{
                    console.log(info);
                    return true;
                    
                }
            });
        }); 
    } catch (err){
        console.log('Error sending email. Error: ' + err);
        return err;
    } 
}

module.exports = {
    emailNotification: emailNotification
  }