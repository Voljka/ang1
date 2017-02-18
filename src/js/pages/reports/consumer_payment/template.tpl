
<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-5">
				REPORT : PAYMENTS FROM CONSUMERS
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
						<td>{{position.product.name}}</td>						
						<td>{{position.quantity}}</td>						
						<td>{{position.price}}</td>						
						<td>{{position.quantity * position.price * 1.2}}</td>						
						<td>{{position.payed_amount}}</td>						
						<td>{{position.quantity * position.price * 1.2 - position.payed_amount}}</td>
						<td ng-class="position.paymentView.danger"><pre>{{position.paymentView.view}}</pre></td>
						<td>{{position.specification.contract.consumer.name}}</td>	
						<td>{{position.specification.contract.number}}</td>						
						<td>{{position.specification.number}}</td>						
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

