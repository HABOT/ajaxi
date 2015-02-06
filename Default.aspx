<% @ Page Language="C#" %>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <title>Server Async Call</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script type="text/javascript" src="ajaxi-lib.js"></script>
        <script type="text/javascript">

            /// AJAXI Library
            /// Iframe based asynchronous communication model
            /// Created by: Harold I Jimenez H (harold.jimenez@gmail.com)
            /// LEGIS S.A / R & D 
            /// March 10 2010

            ///AJAXI response will arrive here for every request!!
            function callBackMethod(buffer)
            {
                var response = $("#response");
                if (response != null)
                {
                    response.html(response.html() + "*&nbsp;&nbsp;*" + buffer);
                }
            }

            function Call()
            {		
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
                serverCall(_DEFAULT_METHOD_, "http://haroldj/AJAXI/AsyncPage.aspx", _EMPTY_, callBackMethod);
            }

            function InitLibrary()
            {
                _gaLib.initLibrary();            
                setInterval("updateCounters()", 1000);
            }
        
            function updateCounters()
            {
                var cntrdiv = $("#counters");
                if(cntrdiv != null)
                    cntrdiv.html("Current requests: "+_gaLib.getCurrentRequests()+"<br>Queued Requests: "+_gaLib.getQueuedRequests());
            }

        </script>
        <style type="text/css">
            h2 {
                background-color:black;
                color:white;
                font-family:Verdana,Arial;
                text-align:center;
            }
            h4 {
                font-family:Verdana,Arial;
                text-align:center;
            }
            #counters {
                font-family:Verdana,Arial;
                font-size:12pt;
                font-weight:bold;
            }
        </style>
    </head>
    <body onload="javascript:InitLibrary();">
        <h2>AJAXI Library (DHTML based) - DEVELOPED BY HAROLD I JIMENEZ H (LEGIS S.A - 2010)</h2>
        <h4 align="left">- PRESS THE BUTTON AS MANY TIMES AS YOU CAN...</h4>
        <br />
        <input type="button" value="Perform Asynchronous Call" onclick="javascript:Call();" />
        <div id="counters"></div>
        <br />
        <div id="response"></div>
    </body>
</html>
