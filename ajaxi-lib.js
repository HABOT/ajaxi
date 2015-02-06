
/// AJAXI Library
/// Iframe based asynchronous communication model
/// Created by: Harold I Jimenez H (harold.jimenez@gmail.com)
/// LEGIS S.A / R & D 
/// March 10 2010

        //Configuration parameters
        var _POOL_SIZE_ = 5;
        var _QUEUE_SIZE_ = 20;
        //Constant definitions
        var _FREE_ = 0;
        var _BUSY_ = 1;
        var _LOADING_ = 2;
        var _EMPTY_ = "";
        var _NULL_ = null;
        var _MSIE_ = " MSIE ";
        var _DEFAULT_METHOD_ = "GET";
        var _AJAXCONTEXT_ = "ajaxicontext";
        //The one and unique AJAXILib object
        var _gaLib = new AJAXILib();
                
        //Global Manager for asynchronous requests
        function AJAXILib()
        {
            this._queue = new Array(_QUEUE_SIZE_);
            this._channels = new Array(_POOL_SIZE_);
            
            this.initLibrary = function()
            {
                var ctxt = document.createElement("DIV");
                if(ctxt!=_NULL_)
                {
                    ctxt.id = _AJAXCONTEXT_;
                    ctxt.style.display = "none";
                    ctxt.style.visibility = "collapse";
                    document.body.appendChild(ctxt);
                    
                    for(var ndx=0; ndx<_POOL_SIZE_;ndx++)
                    {
                        this._channels[ndx] = new AJAXIRequest(_DEFAULT_METHOD_, ndx);
                        this._channels[ndx].createContext();
                    }
                    
                    for(var ndx=0; ndx<_QUEUE_SIZE_;ndx++)
                        this._queue[ndx] = _NULL_;
                }
                else
                    alert("General error!!!, LEGIS/UID - AJAXI Library could not be initialized!!");
                    
                setTimeout("_gaLib.checkQueue()", 500);
            }
            this.checkQueue = function()
            {
                for(var ndx1=0;ndx1<this._queue.length;ndx1++)
                {
                    if(this._queue[ndx1]!=_NULL_)
                    {
                        var url = this._queue[ndx1]._url;
                        var data = this._queue[ndx1]._data;
                        var method = this._queue[ndx1]._method;
                        var callback = this._queue[ndx1]._callback;
                        
                        this._queue[ndx1] = _NULL_;
                        this.makeCall(method, url, data, callback);
                    }
                }
                
                setTimeout("_gaLib.checkQueue()", 500);
            }
            this.makeCall = function (method, url, data, callback)
            {                var posted = false;
                for(var ndx0=0; ndx0<this._channels.length;ndx0++)
                {                
                    if(this._channels[ndx0]._state==_FREE_)
                    {
                        this._channels[ndx0]._state = _BUSY_;
                        this._channels[ndx0]._url = url;
                        this._channels[ndx0]._data = data;
                        this._channels[ndx0]._method = method;
                        this._channels[ndx0]._loading = false;
                        this._channels[ndx0]._callback = callback;
                        this._channels[ndx0]._channelObject.src = url;
                        posted = true;                  
                        break;
                    }
                }
                if(!posted)
                {
                    for(var ndx1=0;ndx1<this._queue.length;ndx1++)
                        if(this._queue[ndx1]==_NULL_)
                        {
                            this._queue[ndx1] = new AJAXICache(method, url, data, callback);
                            break;
                        }
                }
            }
            this.callBack = function (index)
            {
                if(navigator.userAgent.indexOf(_MSIE_)>0)
                {
                    if(this._channels[index]._state==_BUSY_ && this._channels[index]._callback!=_NULL_)
                        this._channels[index]._callback(this._channels[index]._channelObject.contentWindow.document.body.innerHTML);
                }else{
                    if(this._channels[index]._state==_BUSY_ && this._channels[index]._callback!=_NULL_)
                        this._channels[index]._callback(this._channels[index]._channelObject.contentDocument.body.innerHTML);
                }
                    
                this._channels[index]._state = _FREE_;
            }
            this.getRequestState = function(index)
            {
                return this._channels[index]._state;
            }
            this.getCurrentRequests = function()
            {
                var counter = 0;
                for(var ndx=0;ndx<this._channels.length;ndx++)
                    if(this._channels[ndx]._state==_BUSY_)
                        counter++;
                    
                return counter;
            }
            this.getQueuedRequests = function()
            {
                var counter = 0;
                for(var ndx=0;ndx<this._queue.length;ndx++)
                    if(this._queue[ndx]!=_NULL_)
                        counter++;
                    
                return counter;
            }
        }

        //SINGLE REQUEST AJAXI Wrapper
        //This class handles a single request by calling back a user function
        //when the response has arrived
        function AJAXIRequest(method, index)
        {
            this._method = method;
            this._url = _EMPTY_;
            this._data = _EMPTY_;
            this._state = _FREE_;
            this._arrayindex = index;
            this._callback = _NULL_;
            this._channelObject = document.createElement("IFRAME");
            this._channelObject.id = index;
            this._channelObject.name = "_FRM"+index;
            this._channelObject.setAttribute("name", "_FRM"+index);
            this._innerCallback = function()            
            {
                var id = _EMPTY_;
                if(navigator.userAgent.indexOf(_MSIE_)>0)
                    id = event.srcElement.id;
                else
                    id = this.id;
                    
                if(_gaLib.getRequestState(id)==_BUSY_)
                    _gaLib.callBack(id)
            }
            this.createContext = function()
            {
                var ctxt = document.getElementById(_AJAXCONTEXT_);
                if(ctxt!=null)
                {
                    ctxt.appendChild(this._channelObject);
                    if(navigator.userAgent.indexOf(_MSIE_)>0)
                        this._channelObject.attachEvent("onload", this._innerCallback);
                    else
                        this._channelObject.onload = this._innerCallback;
                                    
                }
            }
        }
        
        //Cache object to keep data for queued requests
        function AJAXICache(method, url, data, callback)
        {
            this._url = url;
            this._data = data;
            this._method = method;
            this._callback = callback;
        }
        
        function serverCall(method, url, data, callback)
        {		
            _gaLib.makeCall(method, url, _EMPTY_, callback);
        }
