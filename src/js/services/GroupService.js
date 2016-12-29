var query = require('../../queries/mysql').query;

function GroupService() {
	
	function getAllGroups(){
		return query('SELECT * from groups')
			.then( function(data) {
				//console.log(data);
				return data
			});
	};
	
	return { getAll: getAllGroups };
}


module.exports = GroupService;