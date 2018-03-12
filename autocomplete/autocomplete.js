var content = ['c','c++','java','javascript','jsp','jdk','ruby','php','python','node'];
	var show_box = document.getElementById('show_box');
	console.log(content);

	var change_content = function(content,match_data){
		if(match_data == ''){
			return;
		}
		match_data = new RegExp(match_data);
		for(var i=0;i<content.length;i++){
			if(match_data.test(content[i])){
				// add_tagLi(content[i]);
				vm.select_content.push(content[i]);
			}
		}
	}

	var vm = new Vue({
		el: '#auto-box',
		data: {
			new_input: '',
			select_content: [],
			pos: -1
		},
		methods: {
			auto_change: function(){
				console.log(this.new_input);
				// document.getElementById('show_box').innerHTML = '';
				this.select_content = [];
				change_content(content,this.new_input);
			}
		},
		components: {
			'li-tem': {template:'<li></li>'} 
		}
	})