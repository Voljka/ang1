<div class="panel panel-info">
	<div class="panel-heading">{{dict.details}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<div class="input-group">
					<span class="input-group-addon">{{dict.consumer}}</span>
					<span class="form-control">{{currentContract.consumer.name | toUnsafe}}</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{dict.contract_number}}</span>
					<span class="form-control">{{currentContract.number}}</span>
				</div>
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{dict.signed_at}}</span>
					<span class="form-control">{{currentContract.signed_at_formatted}}</span>
				</div>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">{{dict.operations}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<button class="btn btn-info" ng-click="add()">{{dict.add}}</button>
				<button class="btn btn-info" ng-if="current" ng-click="edit()">{{dict.modify}}</button>
			</div>
			<div class="col-md-6">
				<button class="btn btn-default" ng-if="current" ng-click="goPos()">{{dict.positions}}</button>
				<button class="btn btn-default" ng-if="current" ng-click="goPayments()">{{dict.payments}}</button>
				<button class="btn btn-default" ng-if="current" ng-click="goDeliveries()">{{dict.deliveries}}</button>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">{{dict.specification_list}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td>{{dict.specification_number}}</td>
							<td>{{dict.signed_at}}</td>
						</tr>
					</thead>
					<tbody>
						<tr ng-class="specification.selected ? 'item-selected' : ''" ng-repeat="specification in filteredObjects" ng-click="select(specification)">
							<td> {{ specification.number }}</td>
							<td> {{ specification.signed_at_formatted }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>