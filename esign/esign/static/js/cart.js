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
				$(this).find(".order_cnt").attr({"value" : new_num});
				id_check = 1;
			}
		}
	);
	if (id_check == 0)
	{
	  	var new_item = $("<div>", {"id" : prod_id+"-"+prod_num, "class" : "item"}).appendTo("#cart #orders_list");
	  	new_item.load("../../templates/esign/cart_item_form.html");
	  	setTimeout(function () {
	  		new_item.find(".order_cnt").attr({"value" : prod_num});
	  	    new_item.find(".order_txt").html(prod_name);
	  	}, 50);
	}
}
$(document).ready(function ()
	{
		var product_names_array = {fiz : "подпись физ. лица", yur : "подпись юр. лица", ip : "подпись ИП"};
//клик в одной из форм раздела "оформить заказ"
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
			}
		);
//клик на кнопку "поменять" в одном из элементов корзины
		$("#orders_list").on("click", ".item .change_cnt", function ()
			{
				var new_cnt = $(this).parent().find(".order_cnt").val();
				var send;
				if ((parseInt(new_cnt)) && (new_cnt > 0))
				{
					var item_id = $(this).parent().parent().attr("id").split()[0];
					$(this).parent().parent().attr({"id" : item_id+"-"+new_cnt});
//------------------------------------------------------------
					send = item_id+":"+new_cnt;
				}
				else
				{
//------------------------------------------------------------					
					send="";
				}
			}
		);
	}
);