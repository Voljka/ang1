<div id="modal-new-product" ng-show="showNewProductWindow">
	<div class="panel panel-info">
		<div class="panel-heading">New Product</div>	
		<div class="panel panel-body">
			<div class="row">
				<div class="col-md-12">
					<div class="input-group">
						<span class="input-group-addon">Product Name</span>
						<input class="form-control" name="newProductName">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">KVED</span>
						<input class="form-control" name="newProductKVED">
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon">Measure Unit</span>
						<select class="form-control" ng-model="newProductUnit">   
							<option ng-repeat="unit in units" ng-value="unit._id">{{ unit.name }}</option>
						</select>
					</div>
				</div>
				<div class="col-md-6">
					<center>
						<button class="btn btn-primary" ng-click="save()">Add product</button> 
						<button class="btn btn-warning" ng-click="backToList()">Cancel</button>
					</center>
				</div>
			</div>
		</div>
	</div>	
</div>