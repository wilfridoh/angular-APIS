import { Component, OnInit } from '@angular/core';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  lmit = 10;
  offset = 0;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    console.log('Product ID:', id);
    this.toggleProductDetail();
    this.productsService.getProduct(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'New Product',
      price: 100,
      images: [
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcAAQj/xAA/EAACAQIEBAMECAQFBAMAAAABAgMEEQAFEiEGMUFREyJhFDJxgQcjUpGhscHwFUJi0RYzcuHxJEOCojTC0v/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAQQFAAb/xAAwEQABBAEDAgQDCAMAAAAAAAABAAIDESEEEjETUSIyQWEjobEFFDNxgZHB8BVC8f/aAAwDAQACEQMRAD8AzIbj488KAt8scBhYGLC3gF4ux9RhYH7tj0Kb2vthaKcSjDUhed7WXa+FBTtuPNcAYUq3FyPuGFgb2JuD3xNIwEki4HPlhQUn54Vp+474Xp2xICMBNBT1wq2x2w4E35Y63InpiVIamtNgPXHW6kYdCgAH9/vnjrW3O5F/uxymk0ygkA7YSy7W9emHitrhhyx4V2tytjqUbVH09r/fhJXfD7L1O3648CFiAo1EkBQBe5vsMRSEtCYWNnkSONSzuQFUDck7AfHGs8BcCJlgizbOIw1cBqhhubQ3FrnldrEgg3A6Ye+jzg1cshXNMziBrXF0jblCp9O525i4tgxrKlUV38VY40UtJIxsqjuThL3+iydVqNx2MXGuCEqAxx2K2GLN65BUUXs1LTN/lrVxMZHX7RAI036Dna1+dh2FKlt918+qNrdsLRe3LBJwKOHjmMkHE1NLMJzHFTCINs5axvYjbcc8HXE+QcGZTmVDlEeXzpXVU0Ggh3KFDKAwJ1bbasOuitczBjttFZKF6joeuHAOp2ONNqeEsmj+k+lyVKVv4fJQmZovEb3vNve9+gwK5lllBBxzUZY7ezZalcImfX/lx3F9z+frgwQUyOdrv2tDyqQbEA9CAcLA5XO1+eNizrgrIEy6X2PJamSIRao6qjqBI5O/NWbf8b4p+AeEcrreH2zXPqV5vFqBHCIy4sLhL2U9Wvv2GODxVqBrI9hes3ANunTCjuFubfDGixcHZfF9JLZRUwM+WzU7TwprYW2G1732a/4YEs6paaj4pqaGEaadK0xImrkuq1vuwQcCrEc7Hmh2tVAUkCxG52PTnjiNvS1j92NJz7hTJ6Xj7JMrp6XTRVUbNLHrY6iNW973HIYtI+EuGIDxBUV1G5psukJ8sr3VBCrt135nEdQJR1sYANHP/FkYHUnn1t1xxHO4FzjQ+IeG8gqeFk4h4dE0EKuAySXIZdWk7NuDfryxHn4U4cjlqUizWQpHBqjkaqjtr3vfy/6Ra3XEh4TBq4yPVAVh/tjxlNu3TD3hyaQzIwW9jqQgA9seAdwdsHSsgWo+nbB3wRwfWSU5zhvCjnXzUcVQl1f1cdAbkdCCL4k8E8ErMkWZZ1H9XbVFTMBZxbZm7ixFrWNxg/qHcSCOHc/phEknoFkazVj8ONUlJxEtQZ4J1NFU0wvVwzkAxD7QPVT0bl8OWHKCOTNnjqaiEpQRnVT08i28U8xJID96r05newEHPeH5OJ0Sro9FPPRgimnlTeoa9yGv/JcbX5nflzY4f4plnlfLs2hNNmNOSJYTt8x3H5fiVFtLObRaXtRulUH1WkDEGx83I48xTtSwz2kUQMpG2pSbfjjsCl0sQySkrp62KbLaKarelkSVkijLcmuL25Xtgo4oq+IeI8+p6w5FV0lXTRKUjSN2IAYkPyHX8sS/oYGYf4hnNGYvZBEPbdXvEWfRp/8ALn6Y0XLBmK8c5sa8xmH2RDSaOYj1H3vXVfDi6itSabZIcDAQnTfSFn04liXhjxcwpl0SyKrXj581tccr2vgG1ZxR1ycQ1NNIHlm8dZ5YT4UrNv8AAgjl6Y2rITQZlFV5/QDRJWQiKoTs8eob+u9vgBgT4Tg/xf8ARs2TOwE1JKqKSbeUMGX/ANSR8scCB6KI5mMshlDAP6ppeMs5gpy1FwgaeorQAsyo+mQ2JBVdIubAm1+mIr8S8V5fkUFFl+SVNBFSRjVUGBmuADckMthvvglzjMA30i8P5RD/AJVIru6/1GNgPuUf+2LHjQ1n8FzXwUrdHs7+YPEI7ad9idVueIv2Qb2NLfAM5QlPxJxBPmlFmr8KTiekikjB0yedXte/l/pv9+I9RxhmXENPWUFLwzGaiWNld4bs8RN9z5djfvjRaueNc1yqnOaS00kiOyUiqumpAAvckXFvQjnioyuoqhnHEiR5afBapGswTBZwfDVb6TbYgXBvjrHZQJWVewY9z3Q/DxznlOYqKr4daXNFSyFlYMwtzsAfnbFfQ8W59kK1sua5K0jZjVFy1QGjBJULoUWNxYbDBVn9DmkWd5DLQVxklMhURVapqVNPn3A38oPO+9t8SuIWkTi7I2r2gGVliIQ/ve1aXt8tPL1wQI7IxJEa8AyM5Poh3iHMMxzngyWSpy+roCkgaOkp4Gs4AuC7FdlvvYdhirh4qzmaKSrouH1lpm1GV1V5EY6lL9Nr6ALdL40eBc+/xDUtVSUpyTw/qlA+sDbc/wAcVmU5lQZVw/muYU6A0MWYSkhBtYuAxHpck4gOAHCFsrQ2tl/r39PzWdZrnmYZpw5IgyQJl7TmZapNZAkMjFjq5blitsT+BOFxUPFmuZLeEWaCNv5+zfDkRv0weVOQZY/DP8JhYmgmm8dVRreUyeJYEchvt6YqM7o6rKRJXZGviwsuqpy8dbc3i7NbmvI+h58X4oInasFhjjFWr6WcX8JDdu/QDCKam8Zg2rTEDcHkZD/+fzxSZNW0+dUwloptdKfeJuGY9QRzFvxxcy1a04UWe2/mX+X1+W354qG3n2+qz624PKs6lJDTEU8gSW3lNg3r1wG8S5JS8Vp4tE4pc7owCsqnYH7JYf8AIv2uMEdJLJTS+ESHR2uovuQT0PU9TiRWUXjXnonEdRfVqBNnNrWP3AfLBwyh4o4KE74nBzVk1NxfJl6tR5zBUQ1sLFJFRRYkdbX2/dtsdjTazh7Lc1kWpzTLKaSpKAHWusj0v1x2G+FWN+nOS0/usMyiSeBZXpZKzxXeOMLTTmNnvq2Ngb8th64tVnnbXOmaVzMsIkacVJJKXby26Gw5E8zyxTUVT7NsIUkJZWGq/lIvY7H1OH465grlYU8SUDxHNzr73F+t9/nh9Lb2W7hT4faYIvBppKul8X7FWSGbTcBwAOYtuMN5bJJDT6qWoqYZJg7aoZtAOm1gQBvz74j+1+QBIQpClQxdjpB2OkE7bY9gqGiRVZA9mLL5ypUkAGxGDpMEZpT31rN7ZEa2Sq9qMIYVB1sRcXDab7ja2FVlXU+zOgzKtlXw1YlqolWDEjSV72tffEOOv0KAIYwiEMihm8p33589+uEyTiRJF8FFaWxkcXuSPnbn2x1KWxknIU+M1c8y6pqieopxfxJKzR4ZIuQhIPQde2HE9vizEuKqoepkKxxulTZmBGrdt+Q6X64ro6shW1x6yVCs2tl1gdGsd9tsLlrEkSJTSw/VJpTUC1h3sTYnYbntiaRdN18YUoyVMtUKtqmslcIun69i6gkhiWAvpFjew64crA9QqGSulqryWijNYzKLA3IJXny8v44ixZk0QCwxrEofWAjMtjy2N9vhhp6sidJBGg+tMhBYku1+p5/diKXdM2MKe9ZUzZeVlrqsRBVPs/tZfWp2Ataw3I77dMXnDHDM2ZIVq2np8sVyGgWpJWY9RYWtvpN9weWKzJKCOfMqP+LBKahqk0xhh5Z7baNROzXF9+3rjT/aIaeJYYlClRpVByA/thUj6wFnazU9IbGc/wB+aclMcEQhiVVAFkVRYAfDoMQxT1VQRHTyhA5KzTqbsi291R3N+fTnzw7GRPIy+JY/zyAbj0X1/LFpAYItEUY0kjyrz5dcVBL4vZYrhfKAeJeGanJKg53wypEYH/V0YOzgc2X1xLyHiClzelVw1xexB2ZW7G3L4/dgjrzUZfP7RSQmZJ2AkQnYG+7Fidhb5bYCeLOHJaGb/EPDgGgi9TTrytzOw9eY6Hfvh9WMp0bmzeA4cOPf2RXBO9KzRsx8F7nUttvUf26dMSqef2No0Ulom2ULuD/V8T2GBXh3iCHMKcAkgj30J3jP75HF/AjKnh+/Tvt5Tul+o9O4/TFaWMuyMEIfIdrkQo6OgZCGB5EHHYpC08DFEeRU/lEa3Fvu547CfvRGC1F0geCsFA32w6o22Hww0ott+/TDo7Dy3642AvTNS7arjmOl8ODYgGx7HCQOePRzt3HXfBJgXc9Sm18er03Pbfljl53O/fHKCBy3xKkJS+7hQOw7/HCU9R94x6Nr2HP88SiXel/Xc4LeEeEXzPRW5ihShUhljP8A3rH5+XmDyOFcD8L/AMRP8QzCNvYlI8NCCPHNufLdd9iDzBxo8z6QqRgE8gBivLLWAsnXa7b8OM5UHNKSizSgOW1cKyQtZQLe72I7EYCIM0qMgrXoMxnM9CzmOnzHe+ldiCTsbcr9DfnzBlTBc3mqKaPxhTqQktXE4Cs9/NGp57C4JHK9gb3tKzjKcszGjXKKmHQjJeApHYRW2GlrWB7DrhFAja5Y7JNp2yeX+UmklgEC+yFWFtt8eRSPKkiSXSa2kHl4g+y3Y/p8TjP/ABcw4NzIUWZF3oyfqZhfYf2HUfy/DBlTVMOYQqQy6yAVYHY9iCPvBGFyRAt2nhTLEYz3B4KvqGrLKY5tSteymSwJ2vb44VBl6U00jQuywOB9TbYN3HysP2LRJIBIispHjC3m5Fvif3vbbEqkq1DCnke8gG55gdgT3wiN7ozsecehSi3NrO+M+FZ8mnOd8PoQi3M8CLcIDzIA5r3HTmPSXwvxJFWRWN0ddpIid0/uOxxorKCNwCMZZxtwnPktSc7yFSkKm8sSC4i+XVD1HTn8LnmHurbS2cbHeb0KPYpgyAqwIOPcZ7lnGFI1Ivj1EdNKDZo5WsQfTuOxx2A2nskGJ4NFqAVuG74cXzLtbfDS9OnpbDi3O2LoXpwngbjYY963sfhhI5WOFDmCN8EmL07WFjbtj0benxwkkXHO2Fbgc/niUQShe/4Yu+HcgrM1MlRBTLNFT+cpI+lZ7fyA8wSL78sK4W4aqM+maQnw6KNrSyBhcn7K+u/XbGookOV08dNSxhI12VFFvXCpJKwFna3XCLwM830VblPEFNXU2miRo3jPhy0zrpeFhzDDv68j0wyKiTOJ5KSjd1o0Yx1VUjWZyPeijI5EfzN05Dfda3irJ5MyqWqskWRM1hib2mSFtGpCNoydrue3bt5ThzhbiSmnpFo/AWlmgGhoV20gbfd+zviuW1lYu0FvUZn+ETVlY2VZai5dQeIUtHHFEh0RDuwUE6R6Ak4cgqYM+y4PTyLHOoBswDGGS3IjrzI7c8QzqRnmU643WzqTs19rH+/yxUuP8Pj27LfF9i1IPDV77621RlbX/mAWxAW19uvA/ul7WvFFWVVltPX0X8EzfxXkVR4VQ5GpiAN1awuRv+Rxn98w4OzH2GuvJSXvG6g+79pfTuvTp661QzRZnQ0tU8FtSiVFkXdSev8AviPn2S0udUL0tUvPdXX3kboR+98TuHBTNPJsBjky36KryjNI6mJLSBtQBVgbhh3BxY1EbToNDWcbi5sP9vj8cZdIK/g7MjR1qM1Mx1KyciPtp+q/sn2T5qlZGhDq2pbqynZh3GEzRBw2ngqZoTGe4PBVzl9bqCwzXD2AUsbsf9Xb9jpiwYBgQQCD+OK1FiaZZmUFx1w7U5nSUSx+1TKhkNlv+fwwqPdEz4hwkFBecfRlBVV8k+W1cdJA+/gNHqCHrp7D0x7g/LHpa2OxaEj1ZGtnAq18zqbcrb9OmHEOnqLYZVh3PxHTDqmx+B74tBegBTwNhYcuwwu9+eGQRcehwsEgYJMBTt+3Llfvi+4Q4ekzysDG6UcZHjSfa/pHc8r8tjiDkGT1Od1y09KCqA/WSkXWMd/jvy640Wo8XhKFFRDPk4FjIgvJSt/V1ZCevNetxhckm3AVPWarpjYzzFEUaQUNNHTQII4Y10xxrvYDkBiGzTVFV7PT2acWMjsLrAvqOrHoPniCtdLVsiUciySuoYzLZkiUjY+pI5D58sXFL4VBTpDq0qT1O7MerHue+KJJcaCw625dz/eVMFOtHSv7FTLruzhAdIZjubnAZxVw9FnAGcZE/h5iiiRkQ28Tn077Eb7G1j6EVDmM8eYSUmYOGeQ3QIPLGLEnew8tgO+9/TD1Vl5hqJMxoFDzye+rEtqWxNgegueX/GGRSByEmTTOBHHypA3DHEZmJpatRHUpcPGdgw5EqPzHT8cFUXhhS0aCSGRbSRtaxHYj9cUvF/CwzWBM5yZJIqwgSGMDS0nqOzj8cVHDPEjvJ7NWWSpUkEWsJLc7Dv3GCc31anvja5nVi49R2RXkmX+w5vJPQyP7JU+eV388g0jaIs29rs7X3O4UWAGCpSCNsD1HLHHeZDeN7An7Nu/p+WLiGW/XAkqs42o2fZLSZ5QNR1i3B3Rx70bfaH73xlEiZhwZmRpa5WekZtSugNiCffT9V/XntIIIxXZ7k1HntA9HVpzHkkA80bfaHr+eCDsUeE+GYNGx+WlUuT5tHVwoVcMGUMrA7MO4x7mmXTyVPtVIDJI+kEFreHbqD27j0xmBnrOHK2al2mhSZxYbDUrbsv6jBLRcaVkwChKdABe4uxPqMU9Y2PZT+O4SdSwRHOWngrR8pp/YKCKmMhk0D3m/IemOwEx55X6f/ksPRUAx2KY18TRtDTQSA8LI1f1/DCw1u3ywwpwtSBj0AK9U0qSGHfFzw7kVXn9ctPTArGN5ZSLiMd7ddyNhviDkGVVGdZnHQ0hAdhqZidkUEXJ7jccsbbkuW0WQ5WlLRABF3ZiBqkbu1rAnYb26YF79ooKvqtX0htbylZZldFklAKeiQKALs5tqc9yevPbDc89TZI46fx5ZtSxo4+rAtuXPYfjywuqqGeRI4o/EqJBeKImwA6s3ZR/xixyyjFJEweYzSyHVJI3Jmt0HQdhiqH+JYjw5w3E5QBW0FdwNKKmhZqnJpLeKqp5oHPMgDoe368yCizCmzWnV0dWDi6sDcH+4xbZlULRu4rQZqOo8gQqDpPLSBza979flyOfZ5lVTwhV/xHLA82TTsGkiF7wk8rX5ehPwO9jhhF5TGkT4/wBx80ZTIJ42papimpCkcoIJANgVJPQkDf4YeyuvkoJGpa5SsS30ELcRqLbCw3UAi7HYbdTYVeT5tS5jTxuXWRG5N+YP6jF1VU8VbFpbyvpKq4J2B5ggcxy2O22K72Z3N5Usfjpv4+iuSAwPUHAJx1wca0tmeUqRXL5pIkNvFtyK9n/PBRkSVkNO8dY4YLIwju2pyuo2LH122HL8rM74bG81ahrzBJ4Df8rJuFeI5GlFLVn/AKkXFiLCW3P4MOowf0NTHLEpjItblgd494K/iGvM8nXRXLvJEmxmt/MvZxbn1+OB7hXieTxBTVZtUA2BIt4u/K3Rh1H++Dc0HLUySJrx1Y+PUdkeZ/n6ZLSBgNdRKG8JSDbYbk26Db44VwxxAucxtBMAmYQKDKi8iLldQ/8AIEEdCOvPDDJSZ9lvhTIWjcXBK2ZD0YX5EYXk5ynIKcU3tcav/wByaZ1DOfl+AG2OFEcZQAxdKq8SDPpBoEXNKqpjkiEZtriBsdVhqI7HfAPDIKdoZhI3skr/AObGtyCOdh911+YwU8T5O9fmldmDllilkL6UkLI67gN8xY3G23xw9Q1mUU/CYyqry2WYVBM3vqNB1FQwYXIPlv8AD7sUdP8AFe6MiwfktN0AMTYdl3ypEVTkNNEiVWY2cqGFmG4O4PLHYAajLJ45mWEs6DkRb8jyx2Dd9n5w0LOd9mTA0KpVoO2JmXUdTmNbFSUcLSTSsAoUculz2HK56YZyyhrMzrYqOggaaokJCoCBfa/MkAfPG6cI8LUfDNCNOmeta/jVOjn6Lf3RYDa/MXxfLqWhLqREPdV+UcDUNFkQpZZZEzAkS+2xHS8UgvYrubAXsRybriHFnlbR1/8AC87iU5nt7LKnlhqVO2v09R92CuplRpEBkADtojUtbxG56R9xxBzXhJOIMucZs2mtYBoHjO1Lbkq9/U9fSwsqtwNlZXVt/wAQXamZfTLSRtJNJ4tRJ5pJOrfD07DDFcZK0JPTO6VNKS6xg31CzC6jqTe1zy/MMyvPMw4fzH+B8REpMCBDOT5Zl6b+vf5GxwapIJ08SnOmUHVZdt+V/jz+OFuYK2oiXxv3FWWX5hDXhqaoaFplYaVBP1lrMGAO43/EXx7Hl7p4tLIEloJENlkJJW+2m3IqR+99quYzyJJPRFFrdnZGFwSBp1rfkbbfgRfFnk+bw5gHiBKuh0gvYGS177dDsfLzAwLJC3wuKh8QI6jFmvEmS1nBle2YZcGlyqaQeJHf3CTyPr2bryPTBRw9nsNbAjpJqVup6HsR0ODGpp4qmCSGaNZI3Uq6MLhgeYOMj4lyGq4KzA5hlqtNlUzASKT/AJfZT/8AVvkfV/mHumgicZ831WoRS3sQbjEuOQcjgN4dz+Gtp43SQNG2wvsVPY9jgjado6d5I4zKyqSsasAXPa5wCrUbo8q0vt6Yz/6R+EoKmB85oNMVWljLGNvGNxYjs/rhnKuJ82bNxK6yVC1DiM0Y2CWsDpvaxFzf/S1+hxd/SN4jZIlNA4WSaZSpP9Iv/bHSOMLS5W2RSwytDckrGFrqtJBHJUzsLkENI1rfDoRbli0papZV1CxN+g6fP5YczLKWqqWn0U8or5G0aI/MH22G3IjvheU8QpQZZU00sCQ1sIKE6NLOL2YbDZxv+ffBw6xr4t7QnyxCJ9tH5jsrWOOpqqI0rioSEjyzCNrR3/Ar6dOY7GfLwbm1RKgpoVMCwxokryKAwCjcW9b9MBs8xz/MvCUPU0rjwlUs1gx2D/EbX+GNzkEg8MI1oY1GkLsQw2HythUUwdIXtFFNm1EmmragcfR5mTbvVUiseY0sf0x2NGpXd4EM62k5N6+uOw/ryKt/lNT3+SyX6NJEy7JFrYKeI1NVq8SRwb2DEBdjy2G2CibP6tnWMxw6Tz2b++PcdhbuVUlNvKiZLm81TW1dbPDC8sMz08Nw1o0Gm4UX5m+55nly2xY5rndQ9GzGGHVFZ0IDeVhyPPe3rjsdjhykzcFDvF1aM+4YnkzClp2lgjaSKRVIZTpB79eRGB3gziKvFIyOySeC4RWcEnTa9ib72x2OxJ4TmG4c90YyZ7VALMqQq+htwG5gfHDNRm8pzbL5jBDqbzEea1wQe/c3+Qx2OwiQW1FCSHGkQUvElZJAGeGnvcj3W7/HHVGdTVELwT01NJFIpV0ZWIYHmDvjsdhgSTgrIXqpMk4smpsvASBpxEY2JYFTyG5vt0PPB/lXENZosUhNu4P98e47BO5T5zZBPZTKevWGvkr46GkWrlUK8wQ6mA+f727YofpAz2rlmyxdMaBTIfKCOi+uOx2K+pzGbTNG4/eGn+8KqyLiWvoqqpnTwnaKMlRICRc2BJ3wP8UZpLm05zCohhSpLhS8Slb2BIJ35jvzx2OwWgaBCaWpP+IT60FWZbnNbDWvPFIEmK6taixve1/wGNqo89q4qWJNMb2QeZ9RJNuZN8djsQwAPKwXuJebVhHxFV+Gv1MG4vyb++PcdjsOQr//2Q==',
      ],
      description: 'This is a new product',
      categoryId: 1,
    };
    this.productsService.create(newProduct).subscribe((data) => {
      console.log('Product created:', data);
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'edited title',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      // const index = this.products.findIndex(p => p.id === product.id);
      // this.products[index] = data;
      // this.productChosen = data;
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      console.log('update', data);
    });
  }

  delteproduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
}
