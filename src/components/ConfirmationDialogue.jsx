import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteAUserAction } from "../redux/slices/AuthSlice";
import { deleteAProductByIdAction } from "../redux/slices/ProductsSlice";

export function DeleteUserConfirmationDialogue({
  deleteMyAccount,
  setDeleteMyAccount,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Dialog
      open={deleteMyAccount}
      onClose={() => setDeleteMyAccount(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        Delete Your Account <b>({user.fullname})</b>?
      </DialogTitle>
      <DialogContent id="dialog-description">
        <DialogContentText>
          You are About To delete Your Profile from the Database, this Action is
          irreverable, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="py-[10px] px-[20px] inline-block bg-[#ebebeb] text-black hover:text-white text-sm font-bold transition-all uppercase hover:bg-primary_clr"
          onClick={() => setDeleteMyAccount(false)}
        >
          Cancel
        </button>
        <button
          className="py-[10px] px-[20px] inline-block bg-primary_clr text-white text-sm font-bold transition-all uppercase hover:bg-black"
          onClick={() => {
            setDeleteMyAccount(false);
            dispatch(deleteAUserAction());
          }}
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}

export function DeleteProductConfirmationDialogue({
  deleteProduct,
  setDeleteProduct,
  productId,
}) {
  const dispatch = useDispatch();
  return (
    <Dialog
      open={deleteProduct}
      onClose={() => setDeleteProduct(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        This Product and its images will be Deleted from the Database, are you
        sure?
      </DialogTitle>
      <DialogContent id="dialog-description">
        <DialogContentText>
          You are About To delete Your product from the Database, this Action is
          irreverable, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="py-[10px] px-[20px] inline-block bg-[#ebebeb] text-black hover:text-white text-sm font-bold transition-all uppercase hover:bg-primary_clr"
          onClick={() => setDeleteProduct(false)}
        >
          Cancel
        </button>
        <button
          className="py-[10px] px-[20px] inline-block bg-primary_clr text-white text-sm font-bold transition-all uppercase hover:bg-black"
          onClick={() => {
            setDeleteProduct(false);
            dispatch(deleteAProductByIdAction(productId));
          }}
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}
