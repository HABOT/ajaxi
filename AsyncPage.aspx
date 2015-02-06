<%@ Page Language="VB" %>

<%
    Dim index As Int64 = 0
    Dim message As String = String.Empty

    While index < 10000000
        ' Just Do whatever..., 
        message = "RESPONSE NOTHING<BR>"
        index += 1
    End While
    
    Response.Write("Impossible to believe, LRP Finished!!")
	
%>
