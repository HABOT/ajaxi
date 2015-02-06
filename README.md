# ajaxi
IFRAME based AJAX library (AJAXI)

This library is aimed to solve some limitations found in the natural behavior and purpose of AJAX connection. They are intended for small data transfers and a few concurrent connection.

This library solves this problem by allowing "unlimited" AJAXI connections with queuing feature. It has been tested on MS IE 11 (edge selected from meta tag) and Gogle Chrome 40.0.2214.94. 

Feel free to use it and redistribute it if needed. I just ask you to keep some comments about the author (me ;). Also feel free to post any comment on the code regarding improvements and errors, thank you!


USAGE:

- Clone to a selected folder and configure the folder as a virtual directory (change extensions and server side scripting if deploying on a different web container than ASP.NET)
- Change the example URL in the Default.aspx file to point to your test machine (see the "serverCall" function)
- Once configured (virtual directory plus security and other required setup), browse the Default.xxx web page.
- Press the button "Perform Asynchronous Call" as fast as possible to see the queuing feature and executing requests.
- Responses will arrive asynchronously.


