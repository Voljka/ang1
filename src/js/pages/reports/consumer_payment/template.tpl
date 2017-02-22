
<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-5">
				{{dict.consumer_payment_report}}
			</div>

			<div class="col-md-7">
				<button class="btn btn-default" ng-click="changeViewMode()">
					{{ dangerousMode ? dict.sort_by_consumers : dict.sort_by_urgency }}
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
						<td>{{dict.price_no_vat}}</td>
						<td>{{dict.amount_vat}}</td>
						<td>{{dict.payed}}</td>
						<td>{{dict.residual_payment}}</td>
						<td>{{dict.days_to_payment}}</td>
						<td>{{dict.consumer}}</td>
						<td>{{dict.contract}}</td>
						<td>{{dict.specification}}</td>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="position in positions">
						<td>{{position.product.name | toUnsafe}}</td>						
						<td>{{position.quantity}}</td>						
						<td class="digit">{{position.price | asPrice}}</td>						
						<td class="digit">{{(position.quantity * position.price * 1.2) | asPrice}}</td>						
						<td class="digit">{{position.payed_amount | asPrice}}</td>						
						<td class="digit">{{(position.quantity * position.price * 1.2 - position.payed_amount) | asPrice}}</td>
						<td ng-class="position.paymentView.danger"><pre>{{position.paymentView.view}}</pre></td>
						<td>{{position.specification.contract.consumer.name | toUnsafe}}</td>	
						<td>{{position.specification.contract.number}}</td>						
						<td>{{position.specification.number}}</td>						
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

