//изменение содержимого корзины
function addtocart (prod_id, prod_num, prod_name)
{
	var items = $("#cart #orders_list .item");
	var new_num = 0;
	var id_check = 0;
	items.each(function ()
		{
			cur_div = $(this).attr("id").split('-');
			if (cur_div[0] == prod_id)
			{
				new_num = parseInt(cur_div[1])+prod_num;
				$(this).attr({"id" : prod_id+"-"+new_num});
				$(this).find(".order_cnt").val(new_num);
				id_check = 1;
			}
		}
	);
	if (id_check == 0)
	{
	  	var new_item = $("<div>", {"id" : prod_id+"-"+prod_num, "class" : "item"}).appendTo("#cart #orders_list");
	  	var new_form = $("<form>", {"class" : "item_form"}).appendTo(new_item);
	  	$("<div>", {"class" : "order_txt", "text" : prod_name}).appendTo(new_form);
	  	$("<input>", {"class" : "order_cnt", "type" : "text", "value" : prod_num}).appendTo(new_form);
	  	$("<input>", {"class" : "change_cnt", "type" : "button", "value" : "изменить"}).appendTo(new_form);
	  	$("<input>", {"class" : "remove_order", "type" : "button", "value" : "убрать"}).appendTo(new_form);
	}
}
$(document).ready(function ()
	{
		var product_names_array = {fiz : "подпись физ. лица", yur : "подпись юр. лица", ip : "подпись ИП"};
//клик в одной из форм раздела "оформить заказ"
        //$("#cart #orders_list").hide();
        var cart_orders_vsbl = 0;
		$("#products_list .product input:button").click(function ()
			{
				var prod_id = $(this).parent().parent().attr("id").split('_')[0];
				var prod_num = parseInt($(this).parent().find("input:text").val());
				if (prod_num)
				{
					prod_name = product_names_array[prod_id];
					addtocart(prod_id, prod_num, prod_name);
//------------------------------------------------------------					
					send = prod_id+":+"+prod_num;
					var cart_items_cnt = $("#cart #cart_image #cart_items_count").text();
					cart_items_cnt = parseInt(cart_items_cnt)+prod_num;
					$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
				}
				else
				{
//------------------------------------------------------------					
					send = "";
				}
			}
		);
//клик на кнопку "убрать" в одном из элементов корзины
		$("#orders_list").on("click", ".item .remove_order", function ()
			{
				var prod_to_remove = $(this).parent().parent().attr("id").split("-");
				var prod_id = prod_to_remove[0];
				var prod_num = prod_to_remove[1];
//------------------------------------------------------------				
				var send = prod_id+":-"+prod_num;
				$(this).parent().parent().remove();
				var cart_items_cnt = $("#cart #cart_image #cart_items_count").text();
				cart_items_cnt = parseInt(cart_items_cnt)-prod_num;
				$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
			}
		);
//клик на кнопку "поменять" в одном из элементов корзины
		$("#orders_list").on("click", ".item .change_cnt", function ()
			{
				var new_cnt = $(this).parent().find(".order_cnt").val();
				var prev_cnt = parseInt($(this).parent().parent().attr("id").split("-")[1]);
				var send;
				if ((parseInt(new_cnt)) && (new_cnt > 0))
				{
					if (new_cnt.charAt(0) == '+')
					{
						new_cnt = new_cnt.substr(1, (new_cnt.length-1));
					}
					var item_id = $(this).parent().parent().attr("id").split("-")[0];
					$(this).parent().parent().attr({"id" : item_id+"-"+new_cnt});
//------------------------------------------------------------
					send = item_id+":"+new_cnt;
					var cart_items_cnt = $("#cart #cart_image #cart_items_count").text();
					cart_items_cnt = parseInt(cart_items_cnt)+parseInt(new_cnt)-prev_cnt;
					$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
				}
				else
				{
//------------------------------------------------------------					
					send="";
				}
			}
		);
		$("#cart #show_cart_orders").click(function ()
			{
				$(this).parent().find("#orders_list").toggle();
				if (cart_orders_vsbl == 0)
				{
					$(this).attr({"value" : "скрыть"});
					cart_orders_vsbl = 1;
				}
				else
				{
					$(this).attr({"value" : "показать"});
					cart_orders_vsbl = 0;
				}
			}
		);
	}
);