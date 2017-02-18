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

<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-2">
				Delivery Option	
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-if="current" ng-click="checkDeliveryDetailsAndApply()">Apply</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-click="checkDeliveryDetailsAndApply(true)">Apply to all</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">Delivery days</span>
					<input class="form-control" type="number" ng-model="deliveryDays">
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
<div class="row">
	<flash-message>
		<div class="flash-div">{{ flash.text}}</div>
	</flash-message>
</div>

<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-2">
				Payment Option	
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-if="current" ng-click="checkPaymentDetailsAndApply()">Apply</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-click="checkPaymentDetailsAndApply(true)">Apply to all</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Initial Payment days</span>
					<input class="form-control" type="number" ng-model="paymentStartDays">
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
			<div class="col-md-2">
				<button class="btn btn-default" ng-show="! editingMode" ng-click="saveSpecification()">Save Specification</button>
			</div>
			<div class="col-md-3">
				<button class="btn btn-default" ng-show="! editingMode" ng-click="add()">Add</button>
				<button class="btn btn-default" ng-if="current && !editingMode" ng-click="edit()">Modify</button>
				<button class="btn btn-default" ng-if="current && !editingMode" ng-click="removePosition()">Remove</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goProviders()">Providers</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goMediators()">Mediators</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goPayments()">Payments</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-cilck="goDeliveries()">Deliveries</button>		
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
							<!-- Commodity -->
							<td ng-show="! position.editing"> {{ position.product.name }}</td>
							<td ng-show="position.editing">
								<input ng-model="filters.product" type="text" ng-change="filterProduct(position)" placeholder="Product Filter">
								<br>
								<div class="input-group product-select">
									<span class="input-group-addon">Товар: </span>
									<select class="form-control" ng-model="position.product._id" ng-change="changeCommodity(position)"> 
										<option ng-repeat="commodity in products" ng-value="commodity._id">{{ commodity.name }}</option>	
									</select>
								</div>	
								<button class="btn btn-primary" ng-click="addNonExistingProduct()">Add non-existing product</button>
							</td>

							<!-- Quantity -->
							<td class="digit" ng-show="! position.editing"> {{ position.quantity }}</td>
							<td ng-show="position.editing">
								<input type="number" class="editing-number" ng-model="position.quantity" min="1" ng-change="recalcTotal()">
							</td>

							<!-- Price -->
							<td class="digit" ng-show="! position.editing"> {{ splitted(position.price) }}</td>
							<td ng-show="position.editing">
								<input type="number" class="editing-number" ng-model="position.price" min="0.01" ng-change="recalcTotal()">
							</td>

							<!-- Amount -->
							<td class="digit"> {{ splitted(position.quantity * position.price) }}</td>

							<!-- Details or Buttons -->
							<td ng-show="! position.editing"> {{ makeDeliveryDetails(position) }}</td>
							<td ng-show="position.editing">
								<button class="btn btn-primary" ng-show="products.length > 0" ng-click="savePosition(position)">Save</button>
							</td>

							<td ng-show="! position.editing"> <pre>{{ makePaymentDetails(position) }} </pre></td>
							<td ng-show="position.editing && ! position.new">
								<button class="btn btn-primary" ng-click="restorePosition(position)">Restore</button>
							</td>
							<td ng-show="position.editing && position.new">
								<button class="btn btn-primary" ng-click="removePosition(position)">Don't Save</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>

<div class="cover" ng-show="showNewProductWindow">
</div>
<div class="cover-modal" ng-show="showNewProductWindow">
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
