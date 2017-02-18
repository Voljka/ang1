<div class="page-filter">
	<input ng-model="consumerFilter" type="text" ng-change="useConsumerFilter()" placeholder="Consumer name filter">
	<br>
	<button class="btn btn-info" ng-click="addConsumer()">Add</button>
	<button class="btn btn-info" ng-if="currentConsumer" ng-click="editConsumer()">Update</button>
	<button class="btn btn-info" ng-if="currentConsumer" ng-click="deleteConsumer()">Delete</button>
<!-- 	<button class="btn btn-default" ng-show="currentConsumer" ng-cilck="goContracts()">Contracts</button>
 -->	
	<button class="btn btn-default" ng-if="currentConsumer" ng-click="goContracts()">Contracts</button>
	<button class="btn btn-default" ng-if="currentConsumer" ng-click="goPayments()">Payments</button>
	<button class="btn btn-default" ng-if="currentConsumer" ng-click="goDeliveries()">Deliveries</button>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Name</td>
				<td>Group</td>
				<td>Country</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="consumer.selected ? 'item-selected' : ''" ng-repeat="consumer in filteredConsumers" ng-click="selectConsumer(consumer)">
				<td> {{ consumer.name }}</td>
				<td> {{ consumer.group.name }}</td>
				<td> {{ consumer.country.name }}</td>
			</tr>
			
		</tbody>
	</table>
</div>