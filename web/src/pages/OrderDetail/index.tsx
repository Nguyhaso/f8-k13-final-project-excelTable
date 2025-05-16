import {FHeader} from "../../components";
import {Autocomplete, Button, Grid, TextField} from '@mui/material'
import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from "@mui/material/Box";
import {Customer, getMethod, postMethod, Product, OrderDetail} from "../../utils";


interface OrderDetailProps {
  products : any[]
  detail: OrderDetail
  index: number
  onChange: (index: number, updataDetail : any) => void
}

const OrderDetailComponent = ( {products, detail, index, onChange }: OrderDetailProps) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Autocomplete
          fullWidth={true}
          disablePortal
          options={products}
          getOptionLabel={(option: any) => option.name}
          getOptionKey={(option) => option.id}
          onChange={(e, newProduct)=>{
            onChange(index, {
              ...detail,
              products: newProduct,
              price: newProduct?.price || 0,
            })
          }}
          renderInput={
            (params) => <TextField {...params} label="Product Name" value={''} />
          }
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          onChange={e => onChange(index,{...detail, price: e.target.value})}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          fullWidth
          value={detail.quantity}
          label="Quantity"
          variant="outlined"
          onChange={e => onChange(index,{...detail, quantity: e.target.value})}
          error={true}
          helperText="Quantity has been number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          onChange={e => onChange(index,{...detail, amount: e.target.value})}

        />
      </Grid>
    </Grid>
  )
}


export default function() {
  const emptyDetail = { id: null, products: null, price: '', quantity: '', amount: '' }

  // get customerdata by api
  const [customers, setCustomers] = useState<Customer[]>([])
  const onMounted = async () => {
    const [customersData, productsData] = await Promise.all([
      getMethod('/customers'), getMethod('/products')
    ])
    setCustomers([...customersData])
    setProducts([...productsData])
  }
  useEffect(() => {
    onMounted()
  }, [])
  //get product by api
  const [products, setProducts] = useState<Product[]>([])

  const [order, setOrder] = useState({
    id: null,
    customer: {
      id: null, name: ''
    },
    deliveryAddress: '',
    saleDate: '2025-05-10',
    details: [
      { ...emptyDetail }
    ],
    isValid: true,
  })


  const onAddNewDetail = () => {
    const details = order.details
    details.push({...emptyDetail})
    setOrder({...order, details})
  }

  useEffect(() => {
    console.log(order)
  }, [order]);

  // save new order
  const updateDetail = (index: number, updateDetail:any) => {
    const newDetails = [...order.details];
    newDetails[index] = updateDetail;
    setOrder({...order, details: newDetails})
  }
  const onSaveOrder =async () => {
    const toBody = {
      employeeId: 1,
      comment: "New order created",
      details:
        order.details.map((e) => ({
        productId: 10,
        price: 1000,
        quantity: 10
      }))

    };
    console.log(order)
    const newOrder: any = await postMethod(`/orders/`, toBody)

  }
  return (
    <>
      <FHeader title={'Order Details'}/>
      <Box sx={{maxWidth: 1200, margin: 'auto'}} padding={2}>
        <h2 style={{padding: '10px'}}>New Order</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                fullWidth={true}
                disablePortal
                options={customers}
                getOptionLabel={(option: any) => option.name}
                getOptionKey={(option: Customer) => option.id}
                renderInput={
                  (params) => <TextField {...params} label="Customer Name" value={order.customer?.name} />
                }
                onChange={(event, newValue) => {
                  setOrder({...order, customer: newValue, deliveryAddress: newValue?.address})
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={order.deliveryAddress}
                onChange={e => setOrder({...order, deliveryAddress: e.target.value})}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DesktopDatePicker
                sx={{width: '100%'}}
                defaultValue={dayjs(order.saleDate)}
                onChange={(value) => setOrder({...order, saleDate: value.format('YYYY-MM-DD')})}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <h2 style={{padding: '10px'}}>Order Details</h2>
        <Button onClick={onSaveOrder} variant="contained">Save Order</Button>

        <Button onClick={onAddNewDetail}>Add new detail</Button>
        {
          order.details.map((detail, index) => {
            return (
              <OrderDetailComponent
                detail={detail}
              key={index}
              products={products}
              index={index}
              onChange={updateDetail}
            />
            )
          })
        }

      </Box>
    </>
  )
}