frappe.require("assets/erp_customization/js/slick/slick.core.js");
frappe.require("assets/erp_customization/js/slick/slick.grid.css");

frappe.require("assets/erp_customization/js/slick/lib/firebugx.js");
frappe.require("assets/erp_customization/js/slick/plugins/slick.cellrangedecorator.js");
frappe.require("assets/erp_customization/js/slick/plugins/slick.cellrangeselector.js");
frappe.require("assets/erp_customization/js/slick/plugins/slick.cellselectionmodel.js");
frappe.require("assets/erp_customization/js/slick/slick.formatters.js");
frappe.require("assets/erp_customization/js/slick/slick.editors.js");
frappe.require("assets/erp_customization/js/slick/slick.grid.js");


frappe.require("assets/erp_customization/js/slick/slick.groupitemmetadataprovider.js");
frappe.require("assets/erp_customization/js/slick/slick.dataview.js");

frappe.require("assets/erp_customization/js/slick/controls/slick.pager.js");
frappe.require("assets/erp_customization/js/slick/controls/slick.columnpicker.js");





frappe.ui.form.on("Skill Map", "onload", function(frm,doctype,name) {

    // $().appendTo($(wrapper).find('.layout-main-section'));

    $(cur_frm.fields_dict.mygrid.wrapper).append( "<table width='100%>\
  <tr>\
    <td valign='top' width='50%'>\
      <div id='myGrid' style='width:100%;height:300px;''></div>\
    </td>\
  </tr>\
</table>" );

});

frappe.ui.form.on("Skill Map", "render", function(frm,doctype,name) {

  function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
      return {valid: false, msg: "This is a required field"};
    } else {
      return {valid: true, msg: null};
    }
  }

  var dataView;
  var grid;
  var columns = [
    {id: "sel", name: "#", field: "num", cssClass: "cell-selection", width: 40, resizable: false, selectable: false, focusable: false },    {id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", editor: Slick.Editors.Text, validator: requiredFieldValidator},
    {id: "duration", name: "Duration", field: "duration",editor: Slick.Editors.Text},
    {id: "%", name: "% Complete", field: "percentComplete",editor: Slick.Editors.Text,},
    {id: "start", name: "Start", field: "start", minWidth: 60, editor: Slick.Editors.Date},
    {id: "finish", name: "Finish", field: "finish", minWidth: 60, editor: Slick.Editors.Date},
    {id: "effort-driven", name: "Effort Driven", field: "effortDriven",editor: Slick.Editors.Text,}
  ];
  var options = {
    editable: true,
    enableAddRow: true,
    asyncEditorLoading: false,
    enableCellNavigation: true,
    enableColumnReorder: false,
    editable: true,
  };

var query_report=cur_frm.fields_dict.mygrid.wrapper

  $(function () {
    var data = [];
    for (var i = 0; i < 100; i++) {
      data[i] = {
        id: i,
        num:i,
        title: "Task " + i,
        duration: "5 days",
        percentComplete: Math.round(Math.random() * 100),
        start: "01/01/2009",
        finish: "01/05/2009",
        effortDriven: (i % 5 == 0)
      };
    }

  var groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
  dataView = new Slick.Data.DataView({
    groupItemMetadataProvider: groupItemMetadataProvider,
    inlineFilters: true
  });

  dataView.setItems(data)

  dataView.setGrouping({
    getter: "effortDriven",
    formatter: function (g) {
      return "effortDriven:  ";
    },
    aggregators: [
      new Slick.Data.Aggregators.Avg("percentComplete"),
      new Slick.Data.Aggregators.Sum("cost")
    ],
    aggregateCollapsed: false,
    lazyTotalsCalculation: true
  });
    
    grid = new Slick.Grid("#myGrid", dataView, columns, options);
  // register the group item metadata provider to add expand/collapse group handlers
  grid.registerPlugin(groupItemMetadataProvider);

// wire up model events to drive the grid
dataView.onRowCountChanged.subscribe(function (e, args) {
    grid.updateRowCount();
    grid.render();
});
dataView.onRowsChanged.subscribe(function (e, args) {
    grid.invalidateRows(args.rows);
    grid.render();
});

  grid.setSelectionModel(new Slick.CellSelectionModel());

  // var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
  // var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);

  // $("#gridContainer").resizable();
    grid.onAddNewRow.subscribe(function (e, args) {
      var item = args.item;
      grid.invalidateRow(data.length);
      data.push(item);
      grid.updateRowCount();
      grid.render();
    });

  })
});

