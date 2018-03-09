var vm = new Vue({
	el: '#todo_box',
	data: {
		addthing: '',
		todolist: ['wash','clean','make bed']
	},
	methods: {
		addtask: function(){
			this.todolist.push(this.addthing);
			this.addthing = '';
			// console.log(this.todolist);
		},
		remove: function(index){
			this.todolist.splice(index,1);
		}
	}
});