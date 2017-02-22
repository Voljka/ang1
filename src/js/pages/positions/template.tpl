<div class="panel panel-info">
	<div class="panel-heading">{{ dict.details }}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.consumer }}</span>
					<span class="form-control">{{currentSpecification.contract.consumer.name | toUnsafe}}</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.contract_number }}</span>
					<span class="form-control">{{currentSpecification.contract.number}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.signed_at }}</span>
					<span class="form-control">{{currentSpecification.contract.signed_at_formatted}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.specification_number }}</span>
					<span class="form-control">{{currentSpecification.number}}</span>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.signed_at }}</span>
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
				{{ dict.delivery_details }}
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-if="current" ng-click="checkDeliveryDetailsAndApply()"> {{ dict.apply_caption }}</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-click="checkDeliveryDetailsAndApply(true)">{{ dict.apply_to_all }}</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.delivery_days }}</span>
					<input class="form-control" type="number" ng-model="deliveryDays">
				</div>
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.event_caption }}</span>
					<select class="form-control" ng-model="deliveryEvent" ng-init="deliveryEvent=defaultDeliveryEvent">   
						<option ng-repeat="event_d in deliveryEvents" ng-value="event_d._id">{{ event_d.name_ru }}</option>
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
				{{ dict.payment_details }}	
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-if="current" ng-click="checkPaymentDetailsAndApply()">{{ dict.apply_caption }}</button>
			</div>
			<div class="col-md-5">
				<button class="btn btn-warning" ng-click="checkPaymentDetailsAndApply(true)">{{ dict.apply_to_all }}</button>
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.initial_event }}</span>
					<select class="form-control" ng-model="paymentEvent1" ng-init="paymentEvent1=defaultPaymentStartEvent">   
						<option ng-repeat="event_p in paymentEvents" ng-value="event_p._id">{{ event_p.name_ru }}</option>
					</select>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.prepayment_percent }}</span>
					<input class="form-control" type="number" min="1" ng-model="prepaymentPercent">
				</div>
			</div>
			<div class="col-md-1">
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.close_event }}</span>
					<select class="form-control" ng-model="paymentEvent2" ng-init="paymentEvent2=defaultPaymentCloseEvent">   
						<option ng-repeat="event_p in paymentEvents" ng-value="event_p._id">{{ event_p.name_ru }}</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.initial_payment_days }}</span>
					<input class="form-control" type="number" ng-model="paymentStartDays">
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.prepayment_amount }}</span>
					<input class="form-control" type="number" min="1" ng-model="prepaymentAmount">
				</div>
			</div>
			<div class="col-md-1">
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.close_payment_days }}</span>
					<input class="form-control" type="number" ng-model="paymentCloseDays">
				</div>
			</div>
		</div>
	</div>
</div>

<div class="panel panel-info">
	<div class="panel-heading">
		<div class="row">
			<div class="col-md-4">
				{{ dict.position_list }}
			</div>
		</div>
	</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<button class="btn btn-info" ng-show="! editingMode" ng-click="saveSpecification()">{{ dict.save_specification }}</button>
				<button class="btn btn-info" ng-show="! editingMode" ng-click="add()">{{ dict.add }}</button>
				<button class="btn btn-info" ng-if="current && !editingMode" ng-click="edit()">{{ dict.modify }}</button>
				<button class="btn btn-info" ng-if="current && !editingMode" ng-click="removePosition()">{{ dict.remove }}</button>
			</div>
			<div class="col-md-6">
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goProviders()">{{ dict.providers }}</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goMediators()">{{ dict.mediators }}</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goPayments()">{{ dict.payments }}</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode" ng-click="goDeliveries()">{{ dict.deliveries }}</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode && dependOnLetter" ng-click="goLetters()">{{ dict.letters }}</button>
				<button class="btn btn-default" ng-if="current && !current.new && !editingMode && dependOnApplication" ng-click="goApplications()">{{ dict.applications }}</button>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td width="270">{{ dict.product }}</td>
							<td>{{ dict.quantity }}</td>
							<td width="100">{{ dict.price_no_vat }}</td>
							<td width="110">{{ dict.amount }}</td>
							<td>{{ dict.delivery_details }}</td>
							<td>{{ dict.payment_details }}</td>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<td class="total" colspan="3"> {{ dict.summa }} </td>
							<td class="digit total"> {{ splitted(sumNoVAT) }}</td>
						</tr>
						<tr>
							<td class="total" colspan="3"> {{ dict.vat }} </td>
							<td class="digit total"> {{ splitted( vat ) }}</td>
						</tr>
						<tr>
							<td class="total" colspan="3"> {{ dist.total_vat}} </td>
							<td class="digit total"> {{ splitted(total) }}</td>
						</tr>
					</tfoot>
					<tbody>
						<tr ng-class="position.selected ? 'item-selected' : ''" ng-repeat="position in filteredObjects" ng-click="select(position)">
							<!-- Commodity -->
							<td ng-show="! position.editing"> {{ position.product.name | toUnsafe}}</td>
							<td ng-show="position.editing">
								<input ng-model="filters.product" type="text" ng-change="filterProduct(position)" placeholder="{{ dict.product_filter }}">
								<br>
								<div class="input-group product-select">
									<span class="input-group-addon">{{ dict.product }}: </span>
									<select class="form-control" ng-model="position.product._id" ng-change="changeCommodity(position)"> 
										<option ng-repeat="commodity in products" ng-value="commodity._id">{{ commodity.name | toUnsafe}}</option>	
									</select>
								</div>	
								<button class="btn btn-primary" ng-click="addNonExistingProduct()">{{ dict.add_non_existing_commodity }}</button>
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
								<button class="btn btn-primary" ng-show="products.length > 0" ng-click="savePosition(position)">{{ dict.save_caption }}</button>
							</td>

							<td ng-show="! position.editing"> <pre>{{ makePaymentDetails(position) }} </pre></td>
							<td ng-show="position.editing && editingExistedPosition">
								<button class="btn btn-primary" ng-click="restorePosition(position)">{{ dict.restore_caption }}</button>
							</td>
							<td ng-show="position.editing && ! editingExistedPosition">
								<button class="btn btn-primary" ng-click="removePosition(position)">{{ dict.dont_save }}</button>
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
			<div class="panel-heading">{{ dict.new_product }}</div>	
			<div class="panel panel-body">
				<div class="row">
					<div class="col-md-12">
						<div class="input-group">
							<span class="input-group-addon">{{ dict.product_name }}</span>
							<input class="form-control" ng-model="newProductName">
						</div>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">{{ dict.kved }}</span>
							<input class="form-control" ng-model="newProductKVED">
						</div>
					</div>
					<div class="col-md-3">
						<div class="input-group">
							<span class="input-group-addon">{{ dict.unit }}</span>
							<select class="form-control" ng-model="newProductUnit" ng-init="newProductUnit=units[0]._id">   
								<option ng-repeat="unit in units" ng-value="unit._id">{{ unit.name }}</option>
							</select>
						</div>
					</div>
					<div class="col-md-6">
						<center>
							<button class="btn btn-primary" ng-click="addProductToDB()">{{ dict.add_product }}</button> 
							<button class="btn btn-warning" ng-click="backToSpecification()">{{ dict.cancel }}</button>
						</center>
					</div>
				</div>
			</div>
		</div>	
	</div>	
</div>
