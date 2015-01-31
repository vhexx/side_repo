function addtocart (prod_id, prod_num, prod_name)
{
	var items = $("#cart #orders_list .item");
	var new_text, new_num, id_check = 0;
	items.each(function ()
		{
			cur_div = $(this).attr("id").split('-');
			if (cur_div[0] == prod_id)
			{
				new_num = parseInt(cur_div[1])+prod_num;
				new_text = prod_name+" - "+new_num+"шт.";
				$(this).attr({"id" : prod_id+"-"+new_num});
				if ($(this).find(".order_txt").length == 0) {alert(".order_txt not found!");}
				$(this).find(".order_txt").html(new_text);
				id_check = 1;
			}
		}
	);
	if (id_check == 0)
	{
	  	var new_item = $("<div>", {"id" : prod_id+"-"+prod_num, "class" : "item"}).appendTo("#cart #orders_list");
	  	$("<div>", {"class" : "order_txt", "text" : prod_name+" - "+prod_num+"шт."}).appendTo(new_item);
	  	$("<div>", {"class" : "remove_order", "text" : "убрать"}).appendTo(new_item);
	}
}
$(document).ready(function ()
	{
		var product_names_array = {fiz : "подпись физ. лица", yur : "подпись юр. лица", ip : "подпись ИП"};
		$("#products_list .product input:button").click(function ()
			{
				var prod_id = $(this).parent().parent().attr("id").split('_')[0];
				var prod_num = parseInt($(this).parent().find("input:text").val());
				if (prod_num)
				{
					prod_name = product_names_array[prod_id];
					addtocart(prod_id, prod_num, prod_name);
				}
				var send = prod_id+":+"+prod_num;
			}
		);
		$("#orders_list").on("click", ".item .remove_order", function ()
			{
				$(this).parent().remove();
				var prod_to_remove = $(this).parent().attr("id").split("-");
				var prod_id = prod_to_remove[0];
				var prod_num = prod_to_remove[1];
				var send = prod_id+":-"+prod_num;
			}
		);
	}
);