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
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-2">
				Delivery Option	
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-if="current" ng-click="apply()">Apply</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-click="applyToAll()">Apply to all</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">Delivery days</span>
					<input class="form-control" type="number" min="1" ng-model="deliveryDays">
				</div>
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">Event</span>
					<select class="form-control" ng-model="deliveryEvent" ng-init="deliveryEvent=defaultDeliveryEvent">   
						<option ng-repeat="event_d in deliveryEvents" ng-value="event_d._id">{{ event_d.name }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-2">
				Payment Option	
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-if="current" ng-click="apply()">Apply</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-click="applyToAll()">Apply to all</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Initial Payment days</span>
					<input class="form-control" type="number" min="1" ng-model="paymentStartDays">
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Pre-payment, %</span>
					<input class="form-control" type="number" min="1" ng-model="prepaymentPercent">
				</div>
			</div>
			<div class="col-md-3">
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Close Payment days</span>
					<input class="form-control" type="number" ng-model="paymentCloseDays">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Initial Event</span>
					<select class="form-control" ng-model="paymentEvent1" ng-init="paymentEvent1=defaultPaymentStartEvent">   
						<option ng-repeat="event_p in paymentEvents" ng-value="event_p._id">{{ event_p.name }}</option>
					</select>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Pre-payment, UAH</span>
					<input class="form-control" type="number" min="1" ng-model="prepaymentAmount">
				</div>
			</div>
			<div class="col-md-3">
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Close Event</span>
					<select class="form-control" ng-model="paymentEvent2" ng-init="paymentEvent2=defaultPaymentCloseEvent">   
						<option ng-repeat="event_p in paymentEvents" ng-value="event_p._id">{{ event_p.name }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-2">
				Position List
			</div>
			<div class="col-md-3">
				<button class="btn btn-default" ng-click="add()">Add</button>
			</div>
			<div class="col-md-7">
				<button class="btn btn-default" ng-if="current" ng-cilck="goPayments()">Payments</button>
				<button class="btn btn-default" ng-if="current" ng-cilck="goDeliveries()">Deliveries</button>		
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td width="270">Commodity</td>
							<td>Quantity</td>
							<td width="100">Price</td>
							<td width="110">Amount</td>
							<td>Delivery details</td>
							<td>Payment details</td>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<td class="total" colspan="3"> SUM </td>
							<td class="digit total"> {{ splitted(sumNoVAT) }}</td>
						</tr>
						<tr>
							<td class="total" colspan="3"> VAT </td>
							<td class="digit total"> {{ splitted( vat ) }}</td>
						</tr>
						<tr>
							<td class="total" colspan="3"> TOTAL, VAT included </td>
							<td class="digit total"> {{ splitted(total) }}</td>
						</tr>
					</tfoot>
					<tbody>
						<tr ng-class="position.selected ? 'item-selected' : ''" ng-repeat="position in filteredObjects" ng-click="select(position)">
							<td> {{ position.product.name }}</td>
							<td class="digit"> {{ position.quantity }}</td>
							<td class="digit"> {{ splitted(position.price) }}</td>
							<td class="digit"> {{ splitted(position.quantity * position.price) }}</td>
							<td> {{ makeDeliveryDetails(position) }}</td>
							<td> <pre>{{ makePaymentDetails(position) }} </pre></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>