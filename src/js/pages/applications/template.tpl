<div class="panel panel-info">
	<div class="panel-heading">{{dict.operations}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-4">
				<button class="btn btn-info" ng-if="! application" ng-click="add()">{{dict.add}}</button>
			</div>
			<div class="col-md-8">
				<button class="btn btn-info" ng-if="application.selected" ng-click="edit()">{{dict.modify}}</button>
				<button class="btn btn-info" ng-if="application.selected" ng-click="remove()">{{dict.remove}}</button>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">{{dict.application}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>{{dict.sent_at}}</th>
							<th>{{dict.consumer}}</th></td>
							<th>{{dict.contract}}</th></td>
							<th>{{dict.specification}}</th>
							<th>{{dict.product}}</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-show="application" ng-click="select()" ng-class="application.selected ? 'item-selected' : ''">
							<td> {{ application ? (application.send_at | formatRu) : ''}}</td>
							<td> {{ application ? (application.position.specification.contract.consumer.name | toUnsafe) : ""}}</td>
							<td> {{ application.position.specification.contract.number }}</td>
							<td> {{ application.position.specification.number }}</td>
							<td> {{ application ? (application.position.product.name | toUnsafe) : ""}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div> 	
	</div>
</div>

<div class="cover" ng-show="showAppCard">
</div>
<div class="cover-modal" ng-show="showAppCard">
	<div id="modal-payment-card">
		<div class="panel panel-info">
			<div class="panel panel-heading">
				<div class="row">
					<div class="col-md-12">
						<center>
							<h2>{{dict.application_details}}</h2>
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
			</div>
			<div class="panel panel-body">
				<br><br>
				<div class="row">
					<div class="col-md-8">
						<div class="input-group">
							<span class="input-group-addon">{{dict.application_date}}</span>
							<input class="form-control" ng-model="card.appDate" type="date">
						</div>
					</div>	
					<div class="col-md-4">
						<div class="input-group">
							<button class="btn btn-primary" ng-click="saveApp()">{{dict.save_caption}}</button>
							<button class="btn btn-primary" ng-click="backToList()">{{dict.cancel}}</button>
						</div>
					</div>	
				</div>
				<br><br>
			</div>
		</div>	
	</div>	
</div>