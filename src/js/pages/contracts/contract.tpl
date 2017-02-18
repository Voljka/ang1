<div class="page-filter">
	<input ng-model="contractFilter" type="text" ng-change="useContractFilter()" placeholder="Contract number filter">
	<br>
	<button class="btn btn-info" ng-click="add()">Add</button>
	<button class="btn btn-info" ng-if="current" ng-click="edit()">Update</button>
	<button class="btn btn-info" ng-if="current" ng-click="remove()">Delete</button>
	<button class="btn btn-info" ng-if="current" ng-click="goSpec()">Specs</button>
	<button class="btn btn-info" ng-if="current" ng-click="goPayments()">Payments</button>
	<button class="btn btn-info" ng-if="current" ng-click="goDeliveries()">Deliveries</button>
<!-- 	<button class="btn btn-default" ng-if="current" ng-cilck="goSpecifications()">Specifications</button> -->
</div>

<h1>{{currentConsumer.name}}</h1>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Conntract Number</td>
				<td>Signed at</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="contract.selected ? 'item-selected' : ''" ng-repeat="contract in filteredContracts" ng-click="select(contract)">
				<td> {{ contract.number }}</td>
				<td> {{ contract.signed_at_formatted }}</td>
			</tr>
		</tbody>
	</table>
</div>

 