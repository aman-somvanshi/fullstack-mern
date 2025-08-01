// AWS Deploying

// AWS
// AWS is Amazon’s cloud service.
// It let’s you 
// Rent servers
// Manage domains
// Upload objects (mp4 files, jpgs, mp3s …)
// Autoscale servers
// Create k8s clusters
// …
 
// The offering we will be focussing on today is Renting servers




// EC2 Servers

// VMs on AWS are called EC2 Servers
// EC2 stands for Elastic compute Version 2.
// Elastic - Can increase/decrease the size of the machine
// Compute - It is a machine
// You can spin up a new EC2 instance from the aws dashboard

// EC2 (Elastic Compute Cloud) is like renting a computer from Amazon that lives on the internet.
// You can use it to:
// 1. Host websites
// 2. Run backend code
// 3. Store and process data
// 4. Run apps — just like you do on your own computer


// Why you need cloud providers?
// Cloud providers provide the users with compute facility. Each EC2 machine is given a public IP. We can't have users on the internet access our application present on our local machine becuase it doesn't have a public IP.
// And now what we can do is point a particular domain to the IP of our EC2 machine.


// Creating a new EC2 server
// 1. Click on Launch a new instance
// 2. Give a name
// 3. Select an OS
// 4. Select size (here we choose t3.micro)
// 5. Create a new Key pair (A pem file is downloaded into your computer)
// 6. Select Size
// 7. Allow traffic on http/https

// SSH --> Secure Shell 
// It is a way/protocol to safely connect to another computer over the internet or any insecure network.
// You use an SSH client (a program on your computer) to connect to an SSH server (the remote computer you want to manage).




// On AWS EC2, HTTP = port 80, HTTPS = port 443, and you must manually open these ports in the Security Group to receive traffic.


//  1. Standard Web Access (Globally Recognized Ports)
// Browsers automatically try these ports when you type a website like example.com.
// So using them ensures your site is easily reachable without users needing to type :port.


// 2. No Need to Specify Port in URL
// ✅ https://myapp.com → uses port 443 (default)
// ❌ https://myapp.com:3000 → needs extra typing, looks odd








// SSH into the server
// Open the gitbash terminal (the chmod command won't work in powershell)

// 1. Give ssh key permissions
// chmod 700 aman-password.pem

// The above command changes the permissions of the aman-password.pem file to be read, write, and execute for the owner only. This is necessary for SSH to work properly.

// 700 means:
// 7 = read (4) + write (2) + execute (1) for the owner
// 0 = no permissions for the group
// 0 = no permissions for others
// 700 is the most restrictive setting that still allows SSH to function correctly.


// 2. ssh into machine
// ssh -i aman-password.pem ubuntu@54.242.178.34

// 54.242.178.34 --> ip of our aws ec2 server machine

// 3. Clone repo
// git clone https://github.com/hkirat/sum-server


// If your aws machine shows you the following error: - "Temporary failure in name resolution" 
// then your aws machine doesn’t have access to the internet

// This happens because the dns server isn't able to convert the domain name to its corresponding ip.
// Solution -
// run the following command in a linux terminal -sudo vi /etc/resolv.conf 
// Press i to get into insert mode
// Paste nameserver 8.8.8.8 into the file
// Press esc : w q enter

// sudo --> super user



// 4. Install Node.js
// 💡
// https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
// 5. Install all dependencies
// cd sum-server
// npm install

// 6. Start backend
// node index.js




// cat index.js --> this will print all the content from the file into the terminal


// Now , You have an ip/DNS that you can hit to access your ec2 server
// Try visiting the backend --> your_domain:3000
// Notice you can’t visit the website during this time


// Go into security group and edit the inbound rule for 8080. You can either open port 8080, or process on port 80

// You shouldn't make your node js app listen on port 80 or port 443 directly because those ports are reserved for system processes.














// Proxy 
// (You are hiding yourself from the world.)

// You → Proxy → Internet
// A proxy acts like a middleman you use to access the internet

// 🧠 Simple Analogy:
// You're in a country that blocks YouTube. You configure your browser to use a proxy server in the US. Now, when you go to youtube.com:
// The proxy server fetches YouTube content for you. YouTube only sees the proxy's IP, not yours.




// Reverse Proxy
// (You are protecting your server from the world.)

// Internet → Reverse Proxy → Your Server
// A reverse proxy stands in front of your servers, and receives requests from users on their behalf.

// 🧠 Simple Analogy:
// You have a website with 3 servers. You use a reverse proxy like Nginx or Cloudflare.
// When a user visits your website: They hit the reverse proxy first. The proxy decides which server to send the request to. It fetches the response and sends it back to the user.

// Refer to the image - reverse proxy.webp

// So, essentially we want to run multiple processes on the same server (EC2 machine) and we want to make sure that the url looks easy on the eyes. The first thing we need to do is use a reverse proxy which directs the traffic to the correct process based on the url.




// Nginx
// Nginx (pronounced Engine-X) is a web server that can also act as a reverse proxy, load balancer, and cache.


// Installing nginx
// sudo apt update
// sudo apt install nginx

// This should start a nginx server on port 80
// Try visiting the website


// Now what you need to do is to go to you domain service provider and point the domains to the ip of your ec2 server. So that more than one domain points to the same ip address.

// Create reverse proxy
// sudo rm sudo vi /etc/nginx/nginx.conf
// sudo vi /etc/nginx/nginx.conf

// events {
//     # Event directives...
// }

// http {
	// server {
    // listen 80;
    // server_name be1.100xdevs.com;

    // location / {
    //     proxy_pass http://localhost:8080;
    //     proxy_http_version 1.1;
    //     proxy_set_header Upgrade $http_upgrade;
    //     proxy_set_header Connection 'upgrade';
    //     proxy_set_header Host $host;
    //     proxy_cache_bypass $http_upgrade;
    // }
	// }
	// server {
    // listen 80;
    // server_name be2.100xdevs.com;

    // location / {
    //     proxy_pass http://localhost:8081;
    //     proxy_http_version 1.1;
    //     proxy_set_header Upgrade $http_upgrade;
    //     proxy_set_header Connection 'upgrade';
    //     proxy_set_header Host $host;
    //     proxy_cache_bypass $http_upgrade;
    // }
	// }
// }

// sudo nginx -s reload

 
// Start the Backend server
// node index.js

// Visit the website
// https://be1.100xdevs.com/



// You don't need nginx if you are using docker.

// To make sure that the node js process keeps running even after you close the terminal, you can use a process manager like pm2.
// npm i -g pm2
// pm2 start index.js

// pm2 will keep your node.js app running in the background, even if you close the terminal or log out of the server.


// EC2 is like hotel and ports are like rooms of the hotel and reverse proxy acts as a hotel manger for the urls and direct them to their respective room
// NGNIX is like a hotel manager who manages the request and redirect to their respective rooms and also hides the rooms(port number under the hotel name so if anyone wants to visit you you can give your hotel name and manager will redirect the guest to your room automatically
