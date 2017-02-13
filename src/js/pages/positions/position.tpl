<div class="panel panel-info">
	<div class="panel-heading">Details</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">Consumer</span>
					<span class="form-control">{{currentSpecification.contract.consumer.name}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Contract number</span>
					<span class="form-control">{{currentSpecification.contract.number}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Sign Date</span>
					<span class="form-control">{{currentSpecification.contract.signed_at_formatted}}</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Specification number</span>
					<span class="form-control">{{currentSpecification.number}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Sign Date</span>
					<span class="form-control">{{currentSpecification.signed_at_formatted}}</span>
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
				<button class="btn btn-info" ng-if="current" ng-click="remove()">Delete</button>
			</div>
			<div class="col-md-6">
				<button class="btn btn-default" ng-if="current" ng-cilck="goPayments()">Payments</button>
				<button class="btn btn-default" ng-if="current" ng-cilck="goDeliveries()">Deliveries</button>		
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">Position List</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td>Commodity</td>
							<td>Quantity</td>
							<td>Price</td>
							<td>Amount</td>
							<td>Delivery,<br>days</td>
							<td>Delivery,<br>start event</td>
						</tr>
					</thead>
					<tbody>
						<tr ng-class="position.selected ? 'item-selected' : ''" ng-repeat="position in filteredObjects" ng-click="select(position)">
							<td> {{ position.product.name }}</td>
							<td> {{ position.quantity }}</td>
							<td> {{ position.price }}</td>
							<td> {{ position.quantity * position.price }}</td>
							<td> {{  }}</td>
							<td> {{  }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>