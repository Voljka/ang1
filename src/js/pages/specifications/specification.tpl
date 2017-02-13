<div class="panel panel-info">
	<div class="panel-heading">Details</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">Consumer</span>
					<!-- <input ng-disabled="true" class="form-control" type="text" ng-model=""> -->
					<span class="form-control">{{currentContract.consumer.name}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Contract number</span>
<!-- 					<input ng-disabled="true" class="form-control" type="text" ng-model="currentContract.number"> -->
					<span class="form-control">{{currentContract.number}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Sign Date</span>
<!-- 					<input ng-disabled="true" class="form-control" type="date" ng-model="currentContract.signed_at_formatted"> -->
					<span class="form-control">{{currentContract.signed_at_formatted}}</span>
				</div>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">Operations</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<button class="btn btn-info" ng-click="add()">Add</button>
				<button class="btn btn-info" ng-if="current" ng-click="edit()">Update</button>
			</div>
			<div class="col-md-6">
				<button class="btn btn-info" ng-if="current" ng-click="goPos()">Pos</button>
<!-- 				<button class="btn btn-default" ng-if="current" ng-cilck="goPositions()">Positions</button> -->
				<button class="btn btn-default" ng-if="current" ng-cilck="goPayments()">Payments</button>
				<button class="btn btn-default" ng-if="current" ng-cilck="goDeliveries()">Deliveries</button>		
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">Specification List</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td>Specification Number</td>
							<td>Signed at</td>
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