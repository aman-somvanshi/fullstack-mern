// Certificate Management and AWS Revision

// Firstly, we are creating an instance and placing a node.js app on it.

// We want to make sure that our ec2 machine runs on a secure connection (HTTPS) and we need to set up a certificate for that. Also, we need to make sure that we have a good domain name for our application and we don't have to write the port number in the URL.

// nginx runs on port 80 or port 443. And we don;t have to write the port number in the URL if we are using port 80 or port 443.

// What we can do is to create a domain name and point it to the IP of our ec2 instnace. Now if it's an http request, then nginx running on port 80 will handle the request and if it's an https request, then nginx running on port 443 will handle the request.












// Certificate Management

// Use https://certbot.eff.org/


// certbot - Certbot is a free tool that helps you get SSL certificates from Let’s Encrypt and automatically renews them so your website stays secure with HTTPS.

// It:
// 1. 💸 Gets free HTTPS certificates for your website
// 2. 🤖 Automatically installs and renews them (so you don’t forget)
// 3. 🔐 Makes your site safer by enabling encrypted traffic (HTTPS)



// Install certbot on your EC2 instance
// sudo snap install --classic certbot

// Prepare the Certbot command
// sudo ln -s /snap/bin/certbot /usr/bin/certbot

// Run Certbot to obtain a certificate
// sudo certbot --nginx


// So now certbot will ask you a few questions and then it will generate a certificate for you. It will also configure nginx to use the certificate. You can see the certificate in the nginx.conf file.

// AWS also has its own certificate managaer