
<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-5">
				{{dict.consumer_delivery_report}}
			</div>

			<div class="col-md-7">
				<button class="btn btn-default" ng-click="changeViewMode()">
					{{ dangerousMode ? dict.sort_by_consumers : dict.sort_by_urgency}}
				</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<table class="table table-bordered">
				<thead>
					<tr>
						<td>{{dict.product}}</td>
						<td>{{dict.quantity}}</td>
						<td>{{dict.delivered}}</td>
						<td>{{dict.residual_delivery}}</td>
						<td>{{dict.days_to_delivery}}</td>
						<td>{{dict.consumer}}</td>
						<td>{{dict.contract}}</td>
						<td>{{dict.specification}}</td>
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