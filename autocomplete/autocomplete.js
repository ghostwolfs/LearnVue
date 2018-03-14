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
				if(this.counter<0){
					this.counter = this.counter*-1;
				}
				if(this.select_content.length!=0){
					this.counter = this.counter%this.select_content.length
					document.getElementsByTagName('li')[this.select_index].className = 'index_in';
					return this.counter
				}
			}
		},
		methods: {
			auto_change: function(event){
				// console.log(event.keyCode);
				// document.getElementById('show_box').innerHTML = '';
				this.select_content = [];
				change_content(content,this.new_input);
				// console.log(this.select_content);
				if(event.keyCode==40){
					this.counter++;
					console.log(this.select_index);
					// for(var i=1;i<this.select_content.length;i++){
					// 	document.getElementsByTagName('li')[i].className = '';
					// }
					// document.getElementsByTagName('li')[this.select_index].className = 'index_in';

				}else if(event.keyCode==38){
					this.counter--;
					console.log(this.select_index);
				}
			},
			select_li: function(index){
				console.log(index);
				this.new_input = this.select_content[index];
				this.select_content = [];
			}
			// focus_in: function(index,this_li){
			// 	console.log(this_li.innerHTML);ss
			// 	this.is_focus = true;
			// }
		},
		components: {
			'li-item': {
				template:'<li v-on:click="select_li(index)"  v-on:mouseover="focus_in" v-on:mouseout="focus_out" v-bind:class="{index_in:is_focus}">{{item}}</li>',
				props: ['item','index','ary','input'],
				methods: {
					select_li: function(index){
						console.log(index);
						this.new_input = this.select_content[index];
						console.log(this.new_input);
						this.$emit('change');
					},
					focus_in: function(){
						return this.is_focus = true;
					},
					focus_out: function(){
						return this.is_focus = false;
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
	})