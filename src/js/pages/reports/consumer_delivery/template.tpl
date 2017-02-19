
<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-5">
				REPORT : DELIVERIES TO CONSUMERS
			</div>

			<div class="col-md-7">
				<button class="btn btn-default" ng-click="changeViewMode()">
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
						<td>{{position.product.name | toUnsafe}}</td>						
						<td>{{position.quantity}}</td>						
						<td>{{position.delivered_quantity}}</td>						
						<td>{{position.quantity - position.delivered_quantity}}</td>				
						<td ng-class="position.dangerClass">{{position.days_before_delivery}} {{ position.delivery_period_not_started ? "(Not Started)" : ""}}</td>
						<td>{{position.specification.contract.consumer.name | toUnsafe}}</td>	
						<td>{{position.specification.contract.number}}</td>						
						<td>{{position.specification.number}}</td>						
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>