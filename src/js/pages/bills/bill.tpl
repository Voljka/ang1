<div class="panel panel-info">
	<div class="panel-heading">{{dict.details}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<div class="input-group">
					<span class="input-group-addon">{{dict.provider}}</span>
					<span class="form-control">{{currentProvider.name | toUnsafe}}</span>
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
				<button class="btn btn-default" ng-if="current" ng-click="goPositions()">{{dict.positions}}</button>
<!-- 				<button class="btn btn-default" ng-if="current" ng-click="goPayments()">{{dict.payments}}</button> -->
<!-- 				<button class="btn btn-default" ng-if="current" ng-click="goDeliveries()">{{dict.deliveries}}</button> -->
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">{{dict.bill_list}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>{{dict.bill_number}}</th>
							<th>{{dict.bill_issued_at}}</th>
							<th>{{dict.provider}}</th>
							<th>{{dict.provide_schema}}</th>
							<th>{{dict.mediator}}</th>
							<th>{{dict.vat}}</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-class="bill.selected ? 'item-selected' : ''" ng-repeat="bill in bills" ng-click="select(bill)">
							<td> {{ bill.number }}</td>
							<td> {{ bill.issued_at | formatRu }}</td>
							<td> {{ bill.provider.name | toUnsafe }}</td>
							<td> {{ bill.provide_schema.name }}</td>
							<td> {{ bill.mediator ? bill.mediator.name : "" }}</td>
							<td> {{ bill.vat ? dict.yes : "" }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>