
<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-5">
				REPORT : PAYMENTS FROM CONSUMERS
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
						<td>Price, noVAT</td>
						<td>Amount, VAT</td>
						<td>Payed</td>
						<td>To Pay</td>
						<td>Days<br>before<br>Payment</td>
						<td>Consumer</td>
						<td>Contract</td>
						<td>Spec</td>
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

