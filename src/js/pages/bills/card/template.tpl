<div class="panel panel-info">
	<div class="panel-heading">{{dict.details}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-6">
				<div class="input-group">
					<span class="input-group-addon">{{dict.provider}}</span>
					<span class="form-control">{{billProvider | toUnsafe}}</span>
				</div>
			</div>
		</div>
	</div>
</div>
<br>

<div class="panel panel-info">
	<div class="panel-heading">{{dict.details}}</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{dict.bill_number}}</span>
					<input class="form-control" type="text" ng-model="billNumber">
				</div>
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{dict.bill_issued_at}}</span>
					<input class="form-control" type="date" ng-model="issued_at">
				</div>
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{dict.provide_schema}}</span>
					<select class="form-control" ng-change="changeSchema()" ng-model="billSchema" ng-init="billSchema=currentSchema">   
						<option ng-repeat="schema in schemas" ng-value="schema._id">{{ schema.name }}</option>	
					</select>					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4"></div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{dict.vat}}</span>
					<input class="form-control" type="checkbox" ng-model="vat">
				</div>
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">{{dict.mediator}}</span>
					<select class="form-control" ng-model="billMediator" ng-init="billMediator=currentMediator" ng-disabled="! currentMediator"> 
						<option ng-repeat="mediator in mediators" ng-value="mediator._id">{{ mediator.name }}</option>	
					</select>					
				</div>
			</div>
		</div>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-body">
		<center>
			<button class="btn btn-primary" ng-click="save()">{{ submitCaption }}</button> 
			<button class="btn btn-warning" ng-click="backToList()">{{dict.cancel}}</button>
		</center>
	</div>
</div>