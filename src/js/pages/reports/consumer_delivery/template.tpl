
<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-5">
				REPORT : DELIVERIES TO CONSUMERS
			</div>

			<div class="col-md-7">
				<button class="btn btn-default" ng-clikc="changeViewMode()">
					{{ dangerousMode ? "Sort by Consumers" : "Sort by Urgenity"}}
				</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<table class="table table-bordered">
				<thead>
					<tr>
						<td>Product</td>
						<td>Quantity</td>
						<td>Delivered</td>
						<td>Not<br>delivered<br>yet</td>
						<td>Days<br>before<br>Delivery</td>
						<td>Consumer</td>
						<td>Contract</td>
						<td>Spec</td>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="position in positions">
						<td>{{position.product.name}}</td>						
						<td>{{position.quantity}}</td>						
						<td>{{position.delivered_quantity}}</td>						
						<td>{{position.quantity - position.delivered_quantity}}</td>				
						<td ng-class="position.dangerClass">{{position.days_before_delivery}} {{ position.delivery_period_not_started ? "(Not Started)" : ""}}</td>
						<td>{{position.specification.contract.consumer.name}}</td>	
						<td>{{position.specification.contract.number}}</td>						
						<td>{{position.specification.number}}</td>						
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- <div class="cover" ng-if="showDetailsWindow">
</div>
<div class="cover-modal" ng-if="showDetailsWindow">
	<div id="modal-new-product">
		<div class="panel panel-info">
			<div class="panel-heading">New Product</div>	
			<div class="panel panel-body">
				<div class="row">
					<div class="col-md-12">
						<div class="input-group">
							<span class="input-group-addon">Product Name</span>
							<input class="form-control" ng-model="newProductName">
						</div>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">KVED</span>
							<input class="form-control" ng-model="newProductKVED">
						</div>
					</div>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">Measure Unit</span>
							<select class="form-control" ng-model="newProductUnit" ng-init="newProductUnit=units[0]._id">   
								<option ng-repeat="unit in units" ng-value="unit._id">{{ unit.name }}</option>
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<center>
							<button class="btn btn-primary" ng-click="addProductToDB()">Add product</button> 
							<button class="btn btn-warning" ng-click="backToSpecification()">Cancel</button>
						</center>
					</div>
				</div>
			</div>
		</div>	
	</div>	
</div>
 -->