<div class="panel panel-info">
	<div class="panel-heading">{{ dict.details }}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.provider }}</span>
					<span class="form-control">{{currentBill.provider.name | toUnsafe}}</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.bill_number }}</span>
					<span class="form-control">{{currentBill.number}}</span>
				</div>
			</div>
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{ dict.bill_issued_at }}</span>
					<span class="form-control">{{currentBill.issued_at | formatRu}}</span>
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
				<button class="btn btn-info" ng-show="! editingMode" ng-click="saveBill()">{{ dict.save_bill }}</button>
				<button class="btn btn-info" ng-show="! editingMode" ng-click="add()">{{ dict.add }}</button>
				<button class="btn btn-info" ng-if="current && !editingMode" ng-click="edit()">{{ dict.modify }}</button>
				<button class="btn btn-info" ng-if="current && !editingMode" ng-click="removePosition()">{{ dict.remove }}</button>
			</div>
			<div class="col-md-6">
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
							<td width="100">{{ dict.price_with_vat }}</td>
							<td width="110">{{ dict.amount }}</td>
							<td>{{ dict.delivery_details }}</td>
							<td>{{ dict.payment_details }}</td>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<td class="total" colspan="3"> {{ dict.summa }} </td>
							<td class="digit total"> {{ sumNoVAT | asPrice }}</td>
						</tr>
					</tfoot>
					<tbody>
						<tr ng-class="position.selected ? 'item-selected' : ''" ng-repeat="position in filteredObjects" ng-click="select(position)">
							
							<!-- Commodity -->
							<td ng-if="! position.editing"> {{ position.position.product.name | toUnsafe}}
							</td>

							<td ng-if="position.editing && position.hasOwnProperty('position')">
								{{ position.position.product.name | toUnsafe}}
								<br>
								<button class="btn btn-primary" ng-click="changeConsumerPosition()">	
									{{dict.change_consumer_position}}
								</button>
							</td>

							<td ng-if="position.editing && !position.hasOwnProperty('position')">
								<button class="btn btn-primary" ng-click="addConsumerPosition()">	
									{{dict.add_consumer_position}}
								</button>
							</td>

							<!-- Quantity -->
							<td class="digit" ng-show="! position.editing"> {{ position.quantity }}</td>
							<td ng-show="position.editing">
								<input type="number" class="editing-number" ng-model="position.quantity" min="1" ng-change="recalcTotal()">
							</td>

							<!-- Price -->
							<td class="digit" ng-show="! position.editing"> {{ position.price | asPrice }}</td>
							<td ng-show="position.editing">
								<input type="number" class="editing-number" ng-model="position.price" min="0.01" ng-change="recalcTotal()">
							</td>

							<!-- Amount -->
							<td class="digit"> {{ (position.quantity * position.price) | asPrice }}</td>

							<!-- Details or Buttons -->
							<td ng-show="! position.editing"> {{ makeDeliveryDetails(position) }}</td>
							<td ng-show="position.editing">
								<button class="btn btn-primary" ng-show="position.hasOwnProperty('position')" ng-click="savePosition(position)">{{ dict.save_caption }}</button>
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

<div class="cover" ng-show="showConsumerPositions">
</div>
<div class="cover-modal" ng-show="showConsumerPositions">
	<div id="modal-set-consumer-position-relation">
		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="row">
					<div class="col-md-4">
						{{ dict.positions }}
					</div>
					<div class="col-md-6">
						<input  type="text" 
								ng-model="filters.product" 
								placeholder="{{dict.product_filter}}"
								ng-change="filterProduct()">
					</div>
					<div class="col-md-2">
						<button class="btn btn-primary" ng-click="closeModalWindow()">
							{{ dict.cancel }}
						</button>
					</div>
				</div>
			</div>	
			<div class="panel panel-body">
				<table class="table table-bordered table-condensed" id="table-consumers-positions">
					<thead>
						<tr>
							<td>{{dict.product}}</td>
							<td>{{dict.quantity}}</td>
							<td>{{dict.residual_delivery}}</td>
							<td>{{dict.consumer}}</td>
							<td>{{dict.contract_number}}</td>
							<td>{{dict.specification_number}}</td>
							<td>{{dict.operations}}</td>
						</tr>
					</thead>
					<tbody>
						<tr ng-class="posit.selected ? 'item-selected' : ''" ng-repeat="posit in consumersPositions" ng-click="selectConsumerPosition(posit)">
							<td>{{posit.product.name | toUnsafe}}</td>
							<td>{{ posit.quantity }}</td>
							<td>{{ posit.quantity - posit.delivered.quantity }}</td>
							<td>{{ posit.specification.contract.consumer.name | toUnsafe }}</td>
							<td>{{ posit.specification.contract.number }}</td>
							<td>{{ posit.specification.number }}</td>
							<td>
								<button class="btn btn-primary" 
									ng-show="posit.selected"
									ng-click="setConsumerPosition(posit)"
								>
									{{dict.select_position}}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>	
	</div>	
</div>