var content = ['c','c++','java','javascript','jsp','jdk','ruby','php','python','node'];
var show_box = document.getElementById('show_box');
// console.log(content);

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
	data: function(){
		return {
			new_input: '',
			select_content: [],
			pos: -1,
			is_focus: false,
			counter: -1
		}
	},
	computed:{
		select_index: function(){
			// console.log('a');
			// this.counter = this.counter*-1;
			do{
				this.counter += this.select_content.length;
				// console.log(this.counter);
			}while(this.counter<0);

			if(this.select_content.length!=0){
				this.counter = this.counter%this.select_content.length
				// document.getElementsByTagName('li')[].className = 'index_in';
				return this.counter
			}
		}
	},
	// watch:{
	// 	select_index: function(){
	// 		document.getElementsByTagName('li')[this.select_index].className = 'index_in';
	// 	}
	// },
	methods: {
		auto_change: function(event){
			// console.log(event.keyCode);
			// document.getElementById('show_box').innerHTML = '';
			this.select_content = [];
			change_content(content,this.new_input);
			// console.log(this.select_content);
			if(event.keyCode==40){
				this.counter++;
				// console.log(this.select_index);
				this.add_li_class();

			}else if(event.keyCode==38){
				this.counter--;
				// console.log(this.select_index);
				this.add_li_class();
			}else if(event.keyCode==13){
				// console.log('enter click');
				var li_array = document.getElementsByTagName('li');
				for(var i=0;i<li_array.length;i++){
					if(li_array[i].className == 'index_in'){
						this.new_input = li_array[i].innerHTML;
						this.select_content = [];
					}
				}
			}
		},
		select_li: function(index){
			// console.log(index);
			this.new_input = this.select_content[index];
			this.select_content = [];
		},
		add_li_class: function(){
			for(var i=0;i<this.select_content.length;i++){
				document.getElementsByTagName('li')[i].className = '';
			}
			document.getElementsByTagName('li')[this.select_index].className = 'index_in';
		},
		reset_index: function(){
			this.counter = -1;
			// console.log(this.counter);
		},
		focus_change: function(index){
			// console.log(index);
			this.counter = index;
			this.add_li_class();
		}
	},
	components: {
		'li-item': {
			template:'<li v-on:click="select_li(index)"  v-on:mouseover="focus_in" v-on:mouseout="focus_out" v-bind:class="{index_in:is_focus}">{{item}}</li>',
			props: ['item','index','ary','input'],
			methods: {
				select_li: function(index){
					// console.log(index);
					this.new_input = this.select_content[index];
					// console.log(this.new_input);
					this.$emit('select');
				},
				focus_in: function(){
					this.is_focus = true;
					this.$emit('change');
				},
				focus_out: function(){
					this.is_focus = false;
					this.$emit('reset');
				}
			},
			data: function(){
				return {
					is_focus: false,
					select_content: this.ary,
					new_input: this.input
					// select_content: choose
				}
			}
		}
	}
});