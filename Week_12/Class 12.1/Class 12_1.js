// How to deploy Frontends to AWS

// Usually, people deploy frontends on vercel, but it comes costly at large scale. THen AWS, comes into the picture.


// New things we will learn include
// 1. Object stores (S3)
// 2. CDNs (Cloudfront)
// Step 1 - Signup and get an AWS account. 
// Step 2 - Make sure you can access S3 and cloudfront (this will automatically happen if you are the root user of that account)







// Distribution 

// Youtube distributing mp4 files
// Pinterest distributing jpegs
// google distributing js files
// These files are all objects. (or in other words, content)


// Storage
// Never store an object in a conventional database.

// These objects are stored in object stores. For exmaple, AWS S3 -> Simple Storage 3.

// In AWS, a bucket is like a folder where you store your files on the cloud using S3.

// Acces to these files can be given through the direct URL of the object but that is bad practice. Instead, we use a CDN (Content Delivery Network) to serve these files.



// So until now, 
// Storage --> Object Stores
// Distribution --> CDNs

// CDN --> A CDN is a network of servers located all around the world that helps deliver content (like images, videos, websites) to users faster and more reliably.
// Imagine you order a book online. Instead of shipping it from one far-away warehouse, the company sends it from the nearest branch to you.

// So, when users demand some specific content stored in your S3, you don't give them the object URL. Instead, you first create a CDN, let the CDN know the source of the object. (basically, give the url of the bucket to the CDN).
// Now the distribution url (url of the cdn) points to the source url (url of the s3)

// Whenever, the user tries to access some file through the distribution url, the cdn will look for the file in the s3.

// So, if a user in India tries to access an object, the request goes to the nearest server (in India) which then asks the source (in some other continent) for the content. Once, it receives the content, it caches the content inside the server. Now, everyone in India who wants that file, they can get it from here.




// Final Understanding -
// 1. You store your website/images/videos on a server (origin server).
// 2. CDN copies (caches) that content across many global servers (known as Edge servers).
// 3. When a user visits your site, the CDN serves the content from the nearest location (nearest PoP).


// PoP (Point of Presence)
// A location that houses multiple edge servers.
// When users make requests, they hit the nearest PoP.

// Usually, distribution cost is higher than the Storage cost simply because bandwidth consumed by a million people for even a 1mb file will be very large but the cost of storing that 1 mb file in S3 will be pretty less than that.

// CDNs work best for things that don’t change and are the same for everyone.

//  Why not use CDN for Backend?

// Since each request:
// Might return different data
// Can’t be cached easily
// Requires server-side processing

// Because backend:
// Needs to check your login
// Looks up your personal data
// Often changes fast




// Basically, CDNs cache data and in the case of backends, every user receives different data so you cannot cache it. Hence CDNs shouldn't be used for backends.
// Instead, various backend servers are deployed on the edge network (wherein caching is not possible).



// Why can't we have multiple S3 (or source of truth) throughout the world replicating the data?
// Because the data present inside S3 is large. Replicating it will be expensive















// Build your React frontend

// This approach will not work for frameworks that use Server side rendering (like Next.js)
// This will work for basic React apps, HTML/CSS/JS apps



// Now move over to Week_8/tailwind-prac folder.
// Here, npm run dev is used to deploy the application in local environment only. 
// npm run build -> this is used to convert the jsx/tsx files to html,css,js which the browser understands. All these files are present in the dist folder.


// If you open the html file inside the dist folder now, it won't open the website because it is unable to access the javascript file.
// npm install -g serve 

// serve is a small program that helps you host and view static websites on your local machine or server.

// So, you can serve your website using just the dist folder and don't need any of the outside code.


// At this point you have basic HTML/CSS/JS code that you can deploy on the internet.
// You might be tempted to host this on an EC2 instance, but that is not the right approach

// CDN is better than serving it from a VM/EC2 instances because of a few reasons - 

// 1. EC2 machine approach --> refer to image ec2approach.webp in this folder
// 2. CDN approach --> refer to image CDNapproach.webp in this folder









// Creating an object store in AWS

// In AWS , S3 is their object store offering.
// You can create a bucket in there. A bucket represents a logical place where you store all the files of a certain project.
// Just give a name and create the bucket. Block all public access because you don't want anyone to directly access your S3 because it is very slow.




// Upload the file bundle to S3

// Upload all the files in the dist folder of your react project to S3.
// Keep your index.html in the root of the S3 bucket.



// Try accessing the bucket
// You might be tempted to open your S3 bucket at this point, but don’t
// Your S3 bucket should be blocked by default, and you should allow cloudfront (CDN) to access it.


// Connect to Cloudfront

// 1. Create cloudfront distribution
// Go to cloudfront and create a new distribution. A distribution here means you’re creating a place from where content can be distributed

// 2. Select your S3 bucket as the source


// Origin Access Control (OAC) is a feature in Cloudfront, which allows you to restrict direct access to the content stored in your origin, such as an Amazon S3 bucket or a web server, ensuring that users can only access the content through the CDN distribution and not by directly accessing the origin URL.

// You need to copy the OAC policy into the permissions of the S3 bucket.

// By the end of this, you should have a working cloudfront URL.





// Connect your own domain to it

// Websites aren’t fun if you have to go to a URL that looks like this - https://d25w5h5rtgxu1.cloudfront.net/
// Connect your own custom domain by following the given steps -


// 1. Select edit on the root page
// 2. Attach a domain name to the distribution
// 3. Create a certificate
// Since we want our website to be hosted on HTTPS, we should request a certificate for our domain. Choose the Custom SSL certificate  option. Click on "Request Certificate" option.
// Step 4 - Follow steps to create the certificate in the certificate manager
// Go to you domain DataTransfer, and point the CName name given by AWS to the CNAME value given by AWS. This will be done for validation by AWS that you own the given domain name.
// Step 5 - Add a CNAME record for the website to point to your cloudfront URL

// That’s it, you have a fully running react project hosted on HTTPS on a custom domain









// Error Pages


// You will notice a problem, whenever you try to access a route on your page that isn’t the index route (/user/1) , you reach an error page
// This is because cloudfront is looking for a file /user/1in your S3, which doesn’t exist.
// To make sure that all requests reach index.html, add an error page that points to index.html


// Refer to errorPage.webp

// You might have to invalidate cache to see this in action.

// In AWS CloudFront, "invalidate cache" means removing specific files from CloudFront's edge locations (i.e., the CDN cache), so that the next time a user requests those files, CloudFront fetches the latest version from the origin server (like S3, EC2, etc.).
// You get up to 1,000 free invalidation paths per month.