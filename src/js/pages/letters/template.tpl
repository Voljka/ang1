<div class="panel panel-info">
	<div class="panel-heading">Operations</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-4">
				<button class="btn btn-info" ng-if="! letter" ng-click="add()">Add</button>
			</div>
			<div class="col-md-8">
				<button class="btn btn-info" ng-if="letter.selected" ng-click="edit()">Modify</button>
				<button class="btn btn-info" ng-if="letter.selected" ng-click="remove()">Delete</button>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">Delivery Letter</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>Sent at</th>
							<th>Consumer</th></td>
							<th>Contract</th></td>
							<th>Spec</th>
							<th>Product</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-show="letter" ng-click="select()" ng-class="letter.selected ? 'item-selected' : ''">
							<td> {{ letter ? (letter.send_at | formatRu) : ''}}</td>
							<td> {{ letter.position.specification.contract.consumer.name | toUnsafe}}</td>
							<td> {{ letter.position.specification.contract.number }}</td>
							<td> {{ letter.position.specification.number }}</td>
							<td> {{ letter.position.product.name | toUnsafe}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>

<div class="cover" ng-show="showLetterCard">
</div>
<div class="cover-modal" ng-show="showLetterCard">
	<div id="modal-payment-card">
		<div class="panel panel-info">
			<div class="panel panel-heading">
				<div class="row">
					<div class="col-md-12">
						<center>
							<h2>Letter Details</h2>
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
			</div>
			<div class="panel panel-body">
				<br><br>
				<div class="row">
					<div class="col-md-8">
						<div class="input-group">
							<span class="input-group-addon">Letter Date</span>
							<input class="form-control" ng-model="card.letterDate" type="date">
						</div>
					</div>	
					<div class="col-md-4">
						<div class="input-group">
							<button class="btn btn-primary" ng-click="saveLetter()">Save</button>
							<button class="btn btn-primary" ng-click="backToList()">Cancel</button>
						</div>
					</div>	
				</div>
				<br><br>
			</div>
		</div>	
	</div>	
</div>