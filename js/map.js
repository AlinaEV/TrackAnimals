function DropDown(el) {
 this.dd = el;
 this.placeholder = this.dd.children('span');
 this.opts = this.dd.find('ol.dropdown > li');
 this.val = '';
 this.index = -1;
 this.initEvents();
}
DropDown.prototype = {
 initEvents : function() {
 var obj = this;

 obj.dd.on('click', function(event){
 $(this).toggleClass('active');
 return false;
 });

 obj.opts.on('click',function(){
 var opt = $(this);
 obj.val = opt.text();
 obj.index = opt.index();
 obj.placeholder.text('Gender: ' + obj.val);
 });
 },
 getValue : function() {
 return this.val;
 },
 getIndex : function() {
 return this.index;
 }
}

// $(document).ready(function(){
//   $("#myNav").affix({
//     offset: { 
//       top: 200 
//     }
//   });
//   $("#myNav").on('affixed.bs.affix', function(){
//     alert("Меню навигации была прикреплена. Теперь она не прокручивается вместе со страницей.");
//   });
// });

