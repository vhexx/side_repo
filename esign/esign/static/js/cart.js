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
	    /*var new_form = $("<form>", {"class" : "item_form"}).appendTo(new_item);
	  	$("<div>", {"class" : "order_txt", "text" : prod_name+" - "+prod_price+"р."}).appendTo(new_form);
	  	new_form.append("количество: ");
	  	$("<input>", {"class" : "order_cnt", "type" : "text", "value" : prod_num}).appendTo(new_form);
	  	$("<input>", {"class" : "change_cnt", "type" : "button", "value" : "изменить"}).appendTo(new_form);
	  	$("<input>", {"class" : "remove_order", "type" : "button", "value" : "убрать"}).appendTo(new_form);*/
	  	//var new_form_html = '<form class="item_form" data-parsley-validate>{% csrf_token %}<div class="order_txt">'+prod_name+' - '+prod_price+'р.</div>количество: <input class="order_cnt" value='+prod_num+' type="text" data-parsley-type="digits" data-parsley-trigger="keyup"><input class="change_cnt btn3" type="button" value="поменять"><input class="remove_order btn3" type="button" value="убрать"></form>';
	    //new_item = new_item.append(new_form_html);
	    new_item.load("cart_item_form.html", function () {
	    	new_item.find(".order_txt").text(prod_name+" - "+prod_price+".р");
	    	new_item.find(".order_cnt").val(prod_num);
	    	new_item.find(".order_cnt").attr({"data-parsley-errors-container" : "#err"+prod_id});
	    	new_item.find(".item_err").attr({"id" : "err"+prod_id});
	    	new_item.find(".item_form").parsley();
	    });
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
				var txt_field = $(this).closest(".product").find("input:text");
                if ( (txt_field.parsley().isValid()) && (txt_field.val() != "") && (txt_field.val() != "0"))
				{
					var prod_id = $(this).closest(".product").attr("id");
				    var prod_num = parseInt(txt_field.val());
					var prod_name = product_names_array[prod_id];
					var cart_items_cnt = parseInt($("#cart #cart_image #cart_items_count").text());
					var prod_price = parseInt($(this).closest(".product").find(".product_price").text());
					var total_price = parseInt($("#cart #cart_total_price").text());
					total_price = total_price+(prod_price*prod_num);
//AJAX при добавлении в корзину					
					var serialized_data = $(this).closest(".product").find("form").serializeArray();
					$.ajax({type : "POST", url : "/add_to_basket/", data : serialized_data});
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
				txt_field.val("");
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
				var cart_items_cnt = parseInt($("#cart #cart_image #cart_items_count").text());
				cart_items_cnt = cart_items_cnt-prod_num;
				$(this).closest(".item").find(".order_cnt").val("0");
//AJAX при удалении из корзины
				var serialized_data = $(this).closest(".item").find("form").serializeArray();
				$.ajax({type : "POST", url : "/update_basket/", data : serialized_data});
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
				var cnt_field = $(this).closest(".item").find(".order_cnt");
				var prev_cnt = parseInt($(this).closest(".item").attr("id").split("-")[1]);
				if ( (cnt_field.parsley().isValid()) && (cnt_field.val() != "") )
				{
					new_cnt = parseInt(cnt_field.val());
					var item_id = $(this).closest(".item").attr("id").split("-")[0];
					var cart_items_cnt = parseInt($("#cart #cart_image #cart_items_count").text());
					var prod_price = $(this).closest(".item").find(".order_txt").text().split(" - ")[1];
				    prod_price = parseInt(prod_price.substr(0, prod_price.length-2));
				    var total_price = parseInt($("#cart #cart_total_price").text());
//AJAX при изменении количества элементов в корзине				    
				    var serialized_data = $(this).closest(".item").find("form").serializeArray();
					$.ajax({type : "POST", url : "/update_basket/", data : serialized_data});
//-------------------------------------------------
					$(this).closest(".item").attr({"id" : item_id+"-"+new_cnt});
					cart_items_cnt = cart_items_cnt+new_cnt-prev_cnt;
					total_price = total_price+((new_cnt-prev_cnt)*prod_price);
					$("#cart #cart_image #cart_items_count").html(cart_items_cnt);
					$("#cart #cart_total_price").html(total_price);
				}
				else
				{
					$(this).closest(".item").find(".order_cnt").val(prev_cnt);
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