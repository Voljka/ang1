<div class="row">
	<div class="col-md-5">
		<input ng-model="contractFilter" type="text" ng-change="useContractFilter()" placeholder="{{ dict.contract_number_filter}}">
		<br>
	</div>
</div>
<div class="row">
	<div class="col-md-6">
		<button class="btn btn-info" ng-click="add()">{{dict.add}}</button>
		<button class="btn btn-info" ng-if="current" ng-click="edit()">{{dict.modify}}</button>
		<button class="btn btn-info" ng-if="current" ng-click="remove()">{{dict.remove}}</button>
	</div>
	<div class="col-md-6">
		<button class="btn btn-default" ng-if="current" ng-click="goSpec()">{{dict.specifications}}</button>
		<button class="btn btn-default" ng-if="current" ng-click="goPayments()">{{dict.payments}}</button>
		<button class="btn btn-default" ng-if="current" ng-click="goDeliveries()">{{dict.deliveries}}</button>
	</div>
</div>

<h3>{{currentConsumer.name | toUnsafe }}</h3>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>{{dict.contract_number}}</td>
				<td>{{dict.signed_at}}</td>
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

 