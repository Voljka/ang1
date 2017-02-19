<div class="panel panel-info" ng-if="showControls && ! showDeliveryCard">
	<div class="panel-heading">Operations</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-4">
				<button class="btn btn-info" ng-click="add()">Add</button>
			</div>
			<div class="col-md-8">
				<button class="btn btn-info" ng-if="current" ng-click="edit()">Modify</button>
				<button class="btn btn-info" ng-if="current" ng-click="remove()">Delete</button>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">Delivery List</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>Delivered at</th>
							<th>Consumer</th></td>
							<th>Contract</th></td>
							<th>Spec</th>
							<th>Product</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat-start="consumer in deliveryList"></tr>
						<tr ng-repeat-start="contract in consumer | getObjArray"></tr>
						<tr ng-repeat-start="specification in contract | getObjArray"></tr>
						
						<tr ng-repeat="delivery in specification | getObjArray" ng-class="delivery.selected ? 'item-selected' : ''" ng-click="select(delivery)">
							<td> {{ delivery.delivered_at | formatRu }}</td>
							<td> {{ delivery.position.specification.contract.consumer.name | toUnsafe}}</td>
							<td> {{ delivery.position.specification.contract.number }}</td>
							<td> {{ delivery.position.specification.number }}</td>
							<td> {{ delivery.position.product.name | toUnsafe}}</td>
							<td class="digit"> {{ delivery.quantity | asPrice }}</td>
						</tr>

						<tr ng-repeat-end class="warning">
							<td colspan="3"></td>
							<td colspan="2">{{ specification | getObjName }}	</td>
							<td class="digit">{{ sumBy('position.specification.number', specification | getObjName) | asPrice }}</td>
						</tr>
						<tr ng-repeat-end class="active">
							<td colspan="2"></td>
							<td colspan="3">{{ contract | getObjName }}	</td>
							<td class="digit">{{ sumBy('position.specification.contract.number', contract | getObjName) | asPrice}}</td>
						</tr>
						<tr ng-repeat-end class="success">
							<td></td>
							<td colspan="4">{{ consumer | getObjName }}	</td>
							<td class="digit">{{ sumBy('position.specification.contract.consumer.name', consumer | getObjName) | asPrice}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>

<div class="cover" ng-show="showDeliveryCard">
</div>
<div class="cover-modal" ng-show="showDeliveryCard">
	<div id="modal-payment-card">
		<div class="panel panel-info">
			<div class="panel panel-heading">
				<div class="row">
					<div class="col-md-12">
						<center>
							<h2>Delivery Details</h2>
						</center>
					</div>	
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="input-group">
							<span class="input-group-addon">Product</span>
							<span class="form-control">{{card.productName | toUnsafe}}</span>
						</div>
					</div>	
				</div>
				<br>
				<div class="row">
					<div class="col-md-6">
						<div class="input-group">
							<span class="input-group-addon">Contract Quantity</span>
							<span class="form-control">{{card.contractQuantity | asPrice}}</span>
						</div>
					</div>	
					<div class="col-md-6">
						<div class="input-group">
							<span class="input-group-addon">Already Delivered</span>
							<span class="form-control">{{card.deliveredQuantity | asPrice}}</span>
							
						</div>
					</div>	
				</div>
			</div>
			<div class="panel panel-body">
				<br><br>
				<div class="row">
					<div class="col-md-4">
						<div class="input-group">
							<span class="input-group-addon">Delivery Date</span>
							<input class="form-control" ng-model="card.deliveryDate" type="date">
						</div>
					</div>	
					<div class="col-md-4">
						<div class="input-group">
							<span class="input-group-addon">Quantity</span>
							<input class="form-control" ng-model="card.deliveryQuantity" type="number">
						</div>
					</div>	
					<div class="col-md-4">
						<div class="input-group">
							<button class="btn btn-primary" ng-click="saveDelivery()">Save</button>
							<button class="btn btn-primary" ng-click="backToList()">Cancel</button>
						</div>
					</div>	
				</div>
				<br><br>
				<div class="row">
					<flash-message>
						<div class="flash-div">{{ flash.text}}</div>
					</flash-message>
				</div>
			</div>
		</div>	
	</div>	

</div>