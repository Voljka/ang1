<div class="page-filter">
	<input ng-model="consumerFilter" type="text" ng-change="useConsumerFilter()" placeholder="Consumer name filter">
	<br>
	<button class="btn btn-primary" ng-click="addConsumer()">Add</button>
	<button class="btn btn-info" ng-click="editConsumer()">Update</button>
	<button class="btn btn-warning" ng-click="deleteConsumer()">Delete</button>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>#</td>
				<td>Name</td>
				<td>Group</td>
				<td>Country</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="consumer in filteredConsumers" ng-click="selectConsumer(consumer)">
				<td>--</td>
				<td> {{ consumer.name }}</td>
				<td> {{ consumer.group.name }}</td>
				<td> {{ consumer.country.name }}</td>
			</tr>
			
		</tbody>
	</table>
</div>