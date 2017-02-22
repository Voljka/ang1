<div class="panel panel-info" ng-if="showControls && ! showDeliveryCard">
	<div class="panel-heading">{{dict.operations}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-4">
				<button class="btn btn-info" ng-click="add()">{{dict.add}}</button>
			</div>
			<div class="col-md-8">
				<button class="btn btn-info" ng-if="current" ng-click="edit()">{{dict.modify}}</button>
				<button class="btn btn-info" ng-if="current" ng-click="remove()">{{dict.remove}}</button>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">{{dict.delivery_list}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>{{dict.delivered_at}}</th>
							<th>{{dict.consumer}}</th>
							<th>{{dict.contract}}</th>
							<th>{{dict.specification}}</th>
							<th>{{dict.product}}</th>
							<th>{{dict.quantity}}</th>
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
							<h2>{{dict.delivery_details}}</h2>
						</center>
					</div>	
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="input-group">
							<span class="input-group-addon">{{dict.product}}</span>
							<span class="form-control">{{card.productName | toUnsafe}}</span>
						</div>
					</div>	
				</div>
				<br>
				<div class="row">
					<div class="col-md-6">
						<div class="input-group">
							<span class="input-group-addon">{{dict.contract_quantity}}</span>
							<span class="form-control">{{card.contractQuantity | asPrice}}</span>
						</div>
					</div>	
					<div class="col-md-6">
						<div class="input-group">
							<span class="input-group-addon">{{dict.delivered}}</span>
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
							<span class="input-group-addon">{{dict.delivery_date}}</span>
							<input class="form-control" ng-model="card.deliveryDate" type="date">
						</div>
					</div>	
					<div class="col-md-4">
						<div class="input-group">
							<span class="input-group-addon">{{dict.quantity}}</span>
							<input class="form-control" ng-model="card.deliveryQuantity" type="number">
						</div>
					</div>	
					<div class="col-md-4">
						<div class="input-group">
							<button class="btn btn-primary" ng-click="saveDelivery()">{{dict.save_caption}}</button>
							<button class="btn btn-primary" ng-click="backToList()">{{dict.cancel}}</button>
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