(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,t,a){e.exports=a(59)},36:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(25),l=a.n(s),c=a(15),o=(a(36),a(3)),m=a(4),i=a(6),u=a(5),d=a(7),p=a(62),h=a(64),E=a(63),g="https://vah-taka.glitch.me/api",b=a(2),f=a.n(b),v=a(61);function y(e){var t=""!==e.id?r.a.createElement(v.a,{to:"/",onClick:function(t){t.preventDefault(),e.logout()}},"Log out"):r.a.createElement("span",null);return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-default"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"navbar-header"},r.a.createElement(v.a,{className:"navbar-brand",to:"/"},"Taka")),r.a.createElement("ul",{className:"nav navbar-nav"},r.a.createElement("li",null,r.a.createElement(v.a,{to:"/item_manager"},"Item manager")),r.a.createElement("li",null,r.a.createElement(v.a,{to:"/order_manager"},"Order manager")),r.a.createElement("li",null,t)))))}var N=a(11),O=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:""},a.handleChange=function(e){a.setState(Object(N.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.login(a.state.username,a.state.password),a.props.history.push("/")},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return""!==this.props.id?r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"Loged in")):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-2"}),r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h1",{style:{textAlign:"center"}},"\u0110\u0103ng nh\u1eadp"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"T\xean d\u0103ng nh\u1eadp:"),r.a.createElement("input",{type:"text",className:"form-control",id:"username",placeholder:"Enter username",name:"username",onChange:this.handleChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"M\u1eadt kh\u1ea9u:"),r.a.createElement("input",{type:"password",className:"form-control",id:"password",placeholder:"Enter password",name:"password",onChange:this.handleChange})),r.a.createElement("button",{id:"submitBtn",type:"submit",className:"btn btn-default"},"\u0110\u0103ng nh\u1eadp"),r.a.createElement("br",null),r.a.createElement("br",null)))))}}]),t}(n.Component),w=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={items:[],search:""},a.componentDidMount=function(){setTimeout(function(){a.props.id?f.a.get("".concat(g,"/items")).then(function(e){e.data&&a.setState({items:e.data})}):a.props.history.push("/")},1e3)},a.handleSubmit=function(e){e.preventDefault(),a.state.search?f.a.get("".concat(g,"/items/search/").concat(a.state.search)).then(function(e){console.log(e.data),e.data&&a.setState({items:e.data})}):f.a.get("".concat(g,"/items")).then(function(e){console.log(e.data),e.data&&a.setState({items:e.data})})},a.handleChange=function(e){a.setState(Object(N.a)({},e.target.id,e.target.value))},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){if(0===this.state.items.length)return r.a.createElement("p",null,"loading...");var e=this.state.items.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.price),r.a.createElement("td",null,e.number),r.a.createElement("td",null,e.category),r.a.createElement("td",null,e.brand),r.a.createElement("td",null,r.a.createElement(v.a,{className:"col-sm-4",to:"/info_item/".concat(e._id)},"Detail"),r.a.createElement(v.a,{className:"col-sm-4",to:"/edit_item/".concat(e._id)},"Edit"),r.a.createElement(v.a,{className:"col-sm-4",to:"/delete_item/".concat(e._id)},"Delete")))});return r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"List Item"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-1"},r.a.createElement(v.a,{to:"/add_item",className:"btn btn-primary"},"Add Item")),r.a.createElement("div",{className:"col-sm-11"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{type:"text",className:"form-control",value:this.state.search,onChange:this.handleChange,placeholder:"Search",id:"search"}),r.a.createElement("div",{className:"input-group-btn"},r.a.createElement("button",{className:"btn btn-default",type:"submit"},r.a.createElement("i",{className:"glyphicon glyphicon-search"}))))))),r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"col-sm-6"},"Name"),r.a.createElement("th",{className:"col-sm-1"},"Price"),r.a.createElement("th",{className:"col-sm-1"},"Available"),r.a.createElement("th",{className:"col-sm-1"},"Category"),r.a.createElement("th",{className:"col-sm-1"},"Brand"),r.a.createElement("th",{className:"col-sm-2"}))),r.a.createElement("tbody",null,e)))}}]),t}(n.Component),C=a(17),j=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",category:"MOUPAD",properties:[],brand:"",img:"",number:"",price:"",property:"",categories:[]},a.componentDidMount=function(){setTimeout(function(){a.props.id?f.a.get("".concat(g,"/items/categories")).then(function(e){e.data&&a.setState({categories:e.data})}):a.props.history.push("/")},1e3)},a.handleChange=function(e){a.setState(Object(N.a)({},e.target.id,e.target.value))},a.handleAddProperty=function(e){var t=a.state;a.setState({properties:[].concat(Object(C.a)(t.properties),[t.property]),property:""})},a.reset=function(e){a.setState({properties:[]})},a.handleSubmit=function(e){e.preventDefault(),f.a.post("".concat(g,"/items"),{user:{username:a.props.username,password:a.props.password},item:a.state}).then(function(e){200===e.status?(alert("Added Item"),a.setState({name:"",properties:[],brand:"",img:"",number:"",price:"",property:""})):alert("Can not add item")})},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){if(!this.props.id)return r.a.createElement("p",null,"loading...");var e=this.state.categories.map(function(e){return r.a.createElement("option",{value:e.ID,key:e.ID},e.name)}),t=this.state.properties.map(function(e){return r.a.createElement("p",{key:e},e)}),a=this.state;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"col-sm-1"}),r.a.createElement("form",{onSubmit:this.handleSubmit,className:"col-sm-10"},r.a.createElement("h3",null,"Add item"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name"},"Item name:"),r.a.createElement("input",{value:a.name,onChange:this.handleChange,type:"text",className:"form-control",id:"name"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"category"},"Category:"),r.a.createElement("select",{value:a.category.ID,onChange:this.handleChange,className:"form-control",id:"category"},e)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"properties"},"Properties:"),r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{type:"text",className:"form-control",value:this.state.property,onChange:this.handleChange,id:"property"}),r.a.createElement("div",{className:"input-group-btn"},r.a.createElement("button",{className:"btn btn-default",onClick:this.handleAddProperty,type:"button"},"Add")))),r.a.createElement("div",null,t),r.a.createElement("button",{onClick:this.reset,type:"button",className:"btn btn-default"},"Reset"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"img"},"Item image:"),r.a.createElement("input",{value:a.img,onChange:this.handleChange,type:"text",className:"form-control",id:"img"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"brand"},"Brand:"),r.a.createElement("input",{value:a.brand,onChange:this.handleChange,type:"text",className:"form-control",id:"brand"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"number"},"Number:"),r.a.createElement("input",{value:a.number,onChange:this.handleChange,type:"text",className:"form-control",id:"number"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"price"},"Price:"),r.a.createElement("input",{value:a.price,onChange:this.handleChange,type:"text",className:"form-control",id:"price"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit")),r.a.createElement("div",{className:"col-sm-1"}))}}]),t}(n.Component),S=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={_id:"",name:"",category:"MOUPAD",properties:[],brand:"",img:"",number:"",price:"",property:"",categories:[]},a.componentDidMount=function(){setTimeout(function(){var e=a.props.match.params.id;a.props.id?(f.a.get("".concat(g,"/items/item/").concat(e)).then(function(e){console.log(e.status),200===e.status&&a.setState(e.data)}),f.a.get("".concat(g,"/items/categories")).then(function(e){200===e.status&&a.setState({categories:e.data})})):a.props.history.push("/")},1e3)},a.handleChange=function(e){a.setState(Object(N.a)({},e.target.id,e.target.value))},a.handleAddProperty=function(e){var t=a.state;a.setState({properties:[].concat(Object(C.a)(t.properties),[t.property]),property:""})},a.reset=function(e){a.setState({properties:[]})},a.handleSubmit=function(e){e.preventDefault(),f.a.put("".concat(g,"/items/").concat(a.state._id),{user:{username:a.props.username,password:a.props.password},item:a.state}).then(function(e){200===e.status?alert("Editted Item"):alert("Can not edit item")})},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){if(!this.state._id)return r.a.createElement("p",null,"loading...");var e=this.state.categories.map(function(e){return r.a.createElement("option",{value:e.ID,key:e.ID},e.name)}),t=this.state.properties.map(function(e){return r.a.createElement("p",{key:e},e)}),a=this.state;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"col-sm-1"}),r.a.createElement("form",{onSubmit:this.handleSubmit,className:"col-sm-10"},r.a.createElement("h3",null,"Add item"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name"},"Item name:"),r.a.createElement("input",{value:a.name,onChange:this.handleChange,type:"text",className:"form-control",id:"name"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"category"},"Category:"),r.a.createElement("select",{value:a.category.ID,onChange:this.handleChange,className:"form-control",id:"category"},e)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"properties"},"Properties:"),r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{type:"text",className:"form-control",value:this.state.property,onChange:this.handleChange,id:"property"}),r.a.createElement("div",{className:"input-group-btn"},r.a.createElement("button",{className:"btn btn-default",onClick:this.handleAddProperty,type:"button"},"Add")))),r.a.createElement("div",null,t),r.a.createElement("button",{onClick:this.reset,type:"button",className:"btn btn-default"},"Reset"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"img"},"Item image:"),r.a.createElement("input",{value:a.img,onChange:this.handleChange,type:"text",className:"form-control",id:"img"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"brand"},"Brand:"),r.a.createElement("input",{value:a.brand,onChange:this.handleChange,type:"text",className:"form-control",id:"brand"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"number"},"Number:"),r.a.createElement("input",{value:a.number,onChange:this.handleChange,type:"text",className:"form-control",id:"number"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"price"},"Price:"),r.a.createElement("input",{value:a.price,onChange:this.handleChange,type:"text",className:"form-control",id:"price"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Submit")),r.a.createElement("div",{className:"col-sm-1"}))}}]),t}(n.Component),D=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={_id:"",name:"",category:"MOUPAD",properties:[],brand:"",img:"",number:"",price:"",property:"",categories:[]},a.componentDidMount=function(){setTimeout(function(){var e=a.props.match.params.id;a.props.id?f.a.get("".concat(g,"/items/item/").concat(e)).then(function(e){console.log(e.status),200===e.status&&(a.setState(e.data),console.log(a.state._id))}):a.props.history.push("/")},1e3)},a.deleteItem=function(e){console.log(a.props.password),f.a.delete("".concat(g,"/items/").concat(a.props.match.params.id),{data:{username:a.props.username,password:a.props.password}}).then(function(e){200===e.status?(alert("deleted"),a.props.history.push("/item_manager")):alert("can not delete")}).catch(function(e){return console.log(e)})},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return this.state._id?r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"Are you sure to delete item ",this.state.name),r.a.createElement("button",{type:"button",onClick:this.deleteItem,className:"btn btn-default"},"Sure vl")):r.a.createElement("p",null,"loading...")}}]),t}(n.Component),k=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={_id:"",name:"",category:"MOUPAD",properties:[],brand:"",img:"",number:"",price:"",property:"",categories:[]},a.componentDidMount=function(){setTimeout(function(){var e=a.props.match.params.id;a.props.id?f.a.get("".concat(g,"/items/item/").concat(e)).then(function(e){console.log(e.status),200===e.status&&a.setState(e.data)}):a.props.history.push("/")},1e3)},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){if(!this.state._id)return r.a.createElement("p",null,"loading...");var e=this.state.properties.map(function(e){return r.a.createElement("p",{key:e},e)});return r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"Item Infomation"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("img",{width:"100%",src:this.state.img,alt:"no img"})),r.a.createElement("div",{className:"col-sm-10"},r.a.createElement("p",null,r.a.createElement("strong",null,"ID: "),this.state._id),r.a.createElement("p",null,r.a.createElement("strong",null,"Name: "),this.state.name),r.a.createElement("p",null,r.a.createElement("strong",null,"Brand: "),this.state.brand),r.a.createElement("p",null,r.a.createElement("strong",null,"Category: "),this.state.category),r.a.createElement("p",null,r.a.createElement("strong",null,"Price: "),this.state.price),r.a.createElement("p",null,r.a.createElement("strong",null,"Number: "),this.state.number),r.a.createElement("p",null,r.a.createElement("strong",null,"Props: ")),e,r.a.createElement(v.a,{className:"col-sm-1 btn btn-primary",to:"/edit_item/".concat(this.state._id)},"S\u1eeda"),r.a.createElement("div",{className:"col-sm-1"}),r.a.createElement(v.a,{className:"col-sm-1 btn btn-primary",to:"/delete_item/".concat(this.state._id)},"X\xf3a"),r.a.createElement("div",{className:"col-sm-9"}))))}}]),t}(n.Component),_=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={orders:[],dislayOrders:[]},a.componentDidMount=function(){setTimeout(function(){a.props.id?f.a.post("".concat(g,"/orders/get_all"),{user:{username:a.props.username,password:a.props.password}}).then(function(e){console.log(e.data),e.data&&a.setState({orders:e.data,dislayOrders:e.data})}):a.props.history.push("/")},1e3)},a.handlChange=function(e){var t;switch(e.target.value){case"Carts":t=a.state.orders.filter(function(e){return"CART"===e.status}),a.setState({dislayOrders:t});break;case"Ordered":t=a.state.orders.filter(function(e){return"ORDERED"===e.status}),a.setState({dislayOrders:t});break;case"Shipping":t=a.state.orders.filter(function(e){return"SHIPPING"===e.status}),a.setState({dislayOrders:t});break;case"Paid":t=a.state.orders.filter(function(e){return"Paid"===e.payment||"PaidByPaypal"===e.payment}),a.setState({dislayOrders:t});break;case"Did not pay":t=a.state.orders.filter(function(e){return"NotPay"===e.payment}),a.setState({dislayOrders:t});break;case"Done":t=a.state.orders.filter(function(e){return"DONE"===e.status}),a.setState({dislayOrders:t});break;default:f.a.post("".concat(g,"/orders/get_all"),{user:{username:a.props.username,password:a.props.password}}).then(function(e){console.log(e.data),e.data&&a.setState({orders:e.data,dislayOrders:e.data})})}},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){if(0===this.state.orders.length)return r.a.createElement("p",null,"loading...");var e=this.state.dislayOrders.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e._id),r.a.createElement("td",null,e.fullName),r.a.createElement("td",null,e.address),r.a.createElement("td",null,function(e){console.log(e);var t=e.getDate(),a=e.getMonth()+1,n=e.getFullYear();a<10&&(a="0"+a);t<10&&(t="0"+t);return t+"-"+a+"-"+n}(new Date(e.date))),r.a.createElement("td",null,e.status),r.a.createElement("td",null,e.payment),r.a.createElement("td",null,r.a.createElement(v.a,{to:"/info_order/".concat(e._id)},"Detail")))});return r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"List Orders"),r.a.createElement("div",{className:"form-group"},r.a.createElement("select",{className:"form-control",id:"filter",onChange:this.handlChange},r.a.createElement("option",null,"All orders"),r.a.createElement("option",null,"Carts"),r.a.createElement("option",null,"Ordered"),r.a.createElement("option",null,"Shipping"),r.a.createElement("option",null,"Done"),r.a.createElement("option",null,"Paid"),r.a.createElement("option",null,"Did not pay"))),r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"col-sm-2"},"ID"),r.a.createElement("th",{className:"col-sm-2"},"Receiver"),r.a.createElement("th",{className:"col-sm-4"},"Address"),r.a.createElement("th",{className:"col-sm-1"},"Order Date"),r.a.createElement("th",{className:"col-sm-1"},"Status"),r.a.createElement("th",{className:"col-sm-1"},"Payment"),r.a.createElement("th",{className:"col-sm-1"}))),r.a.createElement("tbody",null,e)))}}]),t}(n.Component);var A=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={order:null},a.componentDidMount=function(){setTimeout(function(){a.props.id?f.a.post("".concat(g,"/orders/get/").concat(a.props.match.params.id),{user:{username:a.props.username,password:a.props.password}}).then(function(e){200===e.status?a.setState({order:e.data}):a.props.history.push("/order_manager")}).catch(function(){return a.props.history.push("/order_manager")}):a.props.history.push("/")},1e3)},a.nextSTT=function(e){f.a.put("".concat(g,"/orders/").concat(a.state.order._id),{user:{username:a.props.username,password:a.props.password},order:{status:"ORDERED"===a.state.order.status?"SHIPPING":"DONE"}}).then(function(e){200===e.status?(console.log(e.data),a.setState({order:e.data})):alert("error")}).catch(function(){return alert("error")})},a.cancelOrder=function(){f.a.put("".concat(g,"/orders/").concat(a.state.order._id),{user:{username:a.props.username,password:a.props.password},order:{status:"CANECLED"}}).then(function(e){200===e.status?(console.log(e.data),a.setState({order:e.data})):alert("error")}).catch(function(){return alert("error")})},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){if(null===this.state.order)return r.a.createElement("p",null,"loading...");var e=this.state.order;if(null===e)return r.a.createElement("p",null,"loading...");var t="ORDERED"===e.status?r.a.createElement("button",{type:"button",className:"btn btn-primary col-sm-3",onClick:this.nextSTT},"Ship now"):"SHIPPING"===e.status?r.a.createElement("button",{type:"button",className:"btn btn-primary col-sm-3",onClick:this.nextSTT},"Done"):r.a.createElement("span",null),a="ORDERED"===e.status?r.a.createElement("button",{type:"button",className:"btn btn-warning col-sm-3",onClick:this.cancelOrder},"Cancel"):r.a.createElement("span",null),n=e.items.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.price),r.a.createElement("td",null,e.number),r.a.createElement("td",null,e.category),r.a.createElement("td",null,e.brand),r.a.createElement("td",null,r.a.createElement(v.a,{className:"col-sm-4",to:"/info_item/".concat(e._id)},"Detail")))});return r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"Order information"),r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("strong",null,"Order ID: "),e._id),r.a.createElement("p",null,r.a.createElement("strong",null,"Total price: "),e.total),r.a.createElement("p",null,r.a.createElement("strong",null,"Order date: "),function(e){console.log(e);var t=e.getDate(),a=e.getMonth()+1,n=e.getFullYear();a<10&&(a="0"+a);t<10&&(t="0"+t);return t+"-"+a+"-"+n}(new Date(e.date))),r.a.createElement("p",null,r.a.createElement("strong",null,"Reciever: "),e.fullName),r.a.createElement("p",null,r.a.createElement("strong",null,"Address: "),e.address),r.a.createElement("p",null,r.a.createElement("strong",null,"Phone: "),e.phone),r.a.createElement("p",null,r.a.createElement("strong",null,"Payment: "),e.payment),r.a.createElement("p",null,r.a.createElement("strong",null,"Status: "),e.status)),r.a.createElement("h3",null,"List items"),r.a.createElement("table",{className:"table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"col-sm-6"},"Name"),r.a.createElement("th",{className:"col-sm-1"},"Price"),r.a.createElement("th",{className:"col-sm-1"},"Available"),r.a.createElement("th",{className:"col-sm-1"},"Category"),r.a.createElement("th",{className:"col-sm-1"},"Brand"),r.a.createElement("th",{className:"col-sm-2"}))),r.a.createElement("tbody",null,n)),r.a.createElement("div",{className:"col-sm-4"},t,r.a.createElement("div",{className:"col-sm-1"}),a))}}]),t}(n.Component);var P=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={id:"",username:"",password:""},a.componentDidMount=function(){var e=a.props.cookies.cookies,t=e.username,n=e.password;console.log(t),f.a.post("".concat(g,"/users/login"),{type:"NORMAL",username:t,password:n}).then(function(e){200===e.status&&"Ad"===e.data.role&&(a.props.cookies.set("username",t),a.props.cookies.set("password",n),a.setState({username:t,password:n,id:e.data._id}))}).catch()},a.login=function(e,t){f.a.post("".concat(g,"/users/login"),{type:"NORMAL",username:e,password:t}).then(function(n){200===n.status&&"Ad"===n.data.role?(a.props.cookies.set("username",e),a.props.cookies.set("password",t),a.setState({username:e,password:t,id:n.data._id})):alert("Login failed")}).catch(function(e){return alert("Login failed")})},a.logout=function(){a.props.cookies.set("username",""),a.props.cookies.set("password",""),a.setState({username:"",password:"",id:""}),window.location.reload()},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(p.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(y,{id:this.state.id,logout:this.logout}),r.a.createElement("div",{className:"container",style:{marginBottom:"50px"}},r.a.createElement(h.a,null,r.a.createElement(E.a,{path:"/item_manager",render:function(t){return r.a.createElement(w,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/order_manager",render:function(t){return r.a.createElement(_,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/add_item",render:function(t){return r.a.createElement(j,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/edit_item/:id",render:function(t){return r.a.createElement(S,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/delete_item/:id",render:function(t){return r.a.createElement(D,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/info_item/:id",render:function(t){return r.a.createElement(k,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/info_order/:id",render:function(t){return r.a.createElement(A,Object.assign({},t,{id:e.state.id,username:e.state.username,password:e.state.password}))}}),r.a.createElement(E.a,{path:"/",render:function(t){return r.a.createElement(O,Object.assign({},t,{id:e.state.id,login:e.login}))}})))))}}]),t}(n.Component),I=Object(c.b)(P);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(c.a,null,r.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,1,2]]]);
//# sourceMappingURL=main.9c4b2322.chunk.js.map