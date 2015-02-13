//изменение содержимого корзины
function addtocart (prod_id, prod_num, prod_name, prod_price)
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
	  	$("<div>", {"class" : "order_txt", "text" : prod_name+" - "+prod_price+"р."}).appendTo(new_form);
	  	new_form.append("количество: ");
	  	$("<input>", {"class" : "order_cnt", "type" : "text", "value" : prod_num}).appendTo(new_form);
	  	$("<input>", {"class" : "change_cnt", "type" : "button", "value" : "изменить"}).appendTo(new_form);
	  	$("<input>", {"class" : "remove_order", "type" : "button", "value" : "убрать"}).appendTo(new_form);
	}
}
$(document).ready(function ()
	{
		
//инициализация массива названий
		var product_names_array = new Object();
		$("#products_list .product").each(function ()
			{
				var prod_id = $(this).attr("id").split('_')[0];
				product_names_array[prod_id] = $(this).find(".product_name").text();
			}
		);
//клик в одной из форм раздела "оформить заказ"
        $("#cart #orders_list").hide();
        var cart_orders_vsbl = 0;
		$("#products_list").on("click", ".product input:button", function ()
			{
				var prod_id = $(this).closest(".product").attr("id").split('_')[0];
				var prod_num = parseInt($(this).closest(".product").find("input:text").val());
				$(this).parent().find("input:text").val("");
				if (prod_num)
				{
					var prod_name = product_names_array[prod_id];
					var cart_items_cnt = parseInt($("#cart #cart_image #cart_items_count").text());
					var prod_price = parseInt($(this).closest(".product").find(".product_price").text());
					var total_price = parseInt($("#cart #cart_total_price").text());
					total_price = total_price+(prod_price*prod_num);
					var msg = prod_id+":+"+prod_num;
//AJAX при добавлении в корзину
					$.ajax({type : "POST", url : "", data : msg});
//-----------------------------
					if (cart_items_cnt == 0)
					{
						$("#cart #orders_list").html("");
					}
					cart_items_cnt = cart_items_cnt+prod_num;
					addtocart(prod_id, prod_num, prod_name, prod_price);
					$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
					$("#cart #cart_total_price").html(total_price);
				}
			}
		);
//клик на кнопку "убрать" в одном из элементов корзины
		$("#orders_list").on("click", ".item .remove_order", function ()
			{
				var prod_to_remove = $(this).closest(".item").attr("id").split("-");
				var prod_id = prod_to_remove[0];
				var prod_num = prod_to_remove[1];
				var prod_price = $(this).closest(".item").find(".order_txt").text().split(" - ")[1];
				prod_price = parseInt(prod_price.substr(0, prod_price.length-2));
				var total_price = parseInt($("#cart #cart_total_price").text())-(prod_price*prod_num);		
				var msg = prod_id+":-"+prod_num;
				var cart_items_cnt = parseInt($("#cart #cart_image #cart_items_count").text());
				cart_items_cnt = cart_items_cnt-prod_num;
//AJAX при удалении из корзины
				$.ajax({type : "POST", url : "", data : msg});
//----------------------------
				$(this).closest(".item").remove();
				$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
				$("#cart #cart_total_price").html(total_price);
				if (cart_items_cnt == 0)
				{
					$("#cart #orders_list").html("пусто");
				}
			}
		);
//клик на кнопку "изменить" в одном из элементов корзины
		$("#orders_list").on("click", ".item .change_cnt", function ()
			{
				var new_cnt = $(this).closest(".item").find(".order_cnt").val();
				var prev_cnt = parseInt($(this).closest(".item").attr("id").split("-")[1]);
				if ((parseInt(new_cnt)) && (parseInt(new_cnt) > 0))
				{
					if (new_cnt.charAt(0) == '+')
					{
						new_cnt = new_cnt.substr(1, (new_cnt.length-1));
					}
					new_cnt = parseInt(new_cnt);
					var item_id = $(this).closest(".item").attr("id").split("-")[0];
					var cart_items_cnt = parseInt($("#cart #cart_image #cart_items_count").text());
					var msg = item_id+":"+new_cnt;
					var prod_price = $(this).parent().find(".order_txt").text().split(" - ")[1];
				    prod_price = parseInt(prod_price.substr(0, prod_price.length-2));
				    var total_price = parseInt($("#cart #cart_total_price").text());
//AJAX при изменении количества элементов в корзине
					$.ajax({type : "POST", url : "", data : msg});
//-------------------------------------------------
					$(this).closest(".item").attr({"id" : item_id+"-"+new_cnt});
					cart_items_cnt = cart_items_cnt+new_cnt-prev_cnt;
					total_price = total_price+((new_cnt-prev_cnt)*prod_price);
					$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
					$("#cart #cart_total_price").html(total_price);
				}
				else
				{
					$(this).parent().find(".order_cnt").val(prev_cnt);
				}
			}
		);
		$("#cart #show_cart_orders").click(function ()
			{
				$(this).parent().find("#orders_list").toggle();
				if (cart_orders_vsbl == 0)
				{
					$(this).html("скрыть");
					cart_orders_vsbl = 1;
				}
				else
				{
					$(this).html("показать");
					cart_orders_vsbl = 0;
				}
			}
		);
	}
);