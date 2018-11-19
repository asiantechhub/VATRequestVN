<?php
/**
 * Created by PhpStorm.
 * User: nvtro
 * Date: 11/15/2018
 * Time: 4:58 PM
 */

namespace Wiki\VAT\Observer;

use Magento\Checkout\Model\Session;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Wiki\VAT\Helper\Data as VATHelper;

class QuoteSubmitBefore implements ObserverInterface
{
    /**
     * @var VATHelper
     */
    protected $VATHelper;

    /**
     * @var \Magento\Checkout\Model\Session
     */
    protected $checkoutSession;

    /**
     * @param VATHelper $VATHelper
     * @param Session $checkoutSession
     * @codeCoverageIgnore
     */
    public function __construct(
        VATHelper $VATHelper,
        Session $checkoutSession
    )
    {
        $this->VATHelper      = $VATHelper;
        $this->checkoutSession = $checkoutSession;
    }

    /**
     * @param Observer $observer
     */
    public function execute(Observer $observer)
    {
        /** @var \Magento\Sales\Api\Data\OrderInterface $order */
        $order = $observer->getEvent()->getOrder();

        if ($VatData = $this->checkoutSession->getVatData()) {
            $order->setData('wk_vat_information', json_encode($VatData));

            $this->checkoutSession->unsVatData();
        }
    }
}