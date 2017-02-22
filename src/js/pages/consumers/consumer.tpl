<div class="row">
	<div class="col-md-5">
		<input ng-model="consumerFilter" type="text" ng-change="useConsumerFilter()" placeholder="{{dict.consumer_name_filter}}">
		<br>
	</div>
</div>

<div class="row">
	<div class="col-md-6">
		<button class="btn btn-info" ng-click="addConsumer()">{{dict.add}}</button>
		<button class="btn btn-info" ng-if="currentConsumer" ng-click="editConsumer()">{{dict.modify}}</button>
		<button class="btn btn-info" ng-if="currentConsumer" ng-click="deleteConsumer()">{{dict.remove}}</button>
	</div>
	<div class="col-md-6">
		<button class="btn btn-default" ng-if="currentConsumer" ng-click="goContracts()">{{dict.contracts}}</button>
		<button class="btn btn-default" ng-if="currentConsumer" ng-click="goPayments()">{{dict.payments}}</button>
		<button class="btn btn-default" ng-if="currentConsumer" ng-click="goDeliveries()">{{dict.deliveries}}</button>
	</div>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>{{dict.name}}</td>
				<td>{{dict.group}}</td>
				<td>{{dict.country}}</td>
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